import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Inquiry } from "@/../../../common-types";
import * as api from "@/api/inquiries.api";

export const useInquiryStore = defineStore("inquiry", () => {
  const inquiries = ref<Inquiry[]>([]);
  const showCount = ref<number>(4);
  const shownInquiries = computed(() =>
    inquiries.value.slice(0, showCount.value)
  );

  const sortInquiries = (list: Inquiry[]): Inquiry[] => {
    const dateSorted = list.sort(
      ({ date: a }, { date: b }) =>
        new Date(a).getTime() - new Date(b).getTime()
    );
    return dateSorted.sort(
      ({ opened: a }, { opened: b }) => Number(a) - Number(b)
    );
  };

  const getInquiries = async () => {
    const res = await api.getAllInquiries();
    if (res) {
      const sorted = sortInquiries(res);
      inquiries.value = sorted;
    }
  };

  const loadMore = () => {
    showCount.value = showCount.value + 4;
  };

  const markAsOpened = async (id: string) => {
    const found = inquiries.value.find((i: Inquiry) => i._id === id);
    if (found && !found.opened) {
      found.opened = true;
      const updated = await api.updateInquiry(found);
      if (!updated) found.opened = false;
    }
  };

  const markAsUnread = async (id: string) => {
    const found = inquiries.value.find((i: Inquiry) => i._id === id);
    if (found && found.opened) {
      found.opened = false;
      const updated = await api.updateInquiry(found);
      if (!updated) found.opened = true;
    }
  };

  const deleteInquiry = async (id: string) => {
    const found = inquiries.value.findIndex((i: Inquiry) => i._id === id);
    if (found >= 0) {
      const deleted = await api.deleteInquiry(id);
      if (deleted) inquiries.value.splice(found, 1);
    }
  };

  return {
    inquiries,
    shownInquiries,
    getInquiries,
    loadMore,
    markAsOpened,
    markAsUnread,
    deleteInquiry,
  };
});
