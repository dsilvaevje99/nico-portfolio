import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Inquiry } from "@/../../../common-types";

const MOCK_DATA: Inquiry[] = [
  {
    id: 0,
    name: "Ola Normann",
    email: "ola.normann@gmail.com",
    company: "Cegal",
    body: "Hey, I just wanted to get in contact to ask if you wanted to collaborate on a thung where you and I could make a film maybe or something like that like lemme know if that sounds cool and all",
    date: new Date(new Date().setDate(new Date().getDate() - 10)),
    opened: true,
  },
  {
    id: 1,
    name: "Bloody Bastard",
    email: "test@gmail.com",
    company: "",
    body: "Hey, I just wanted to get in contact to ask if you wanted to collaborate on a thung where you and I could make a film maybe or something like that like lemme know if that sounds cool and all",
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
    opened: true,
  },
  {
    id: 2,
    name: "Chongo Mongo",
    email: "iasbfasf@gmail.com",
    company: "",
    body: "Short msg lol",
    date: new Date(new Date().setDate(new Date().getDate() - 9)),
    opened: false,
  },
  {
    id: 3,
    name: "Voodoo Man With a Long Name Haha Lol Yeah Baby",
    email: "testalongemailtocheckwhathappens@gmail.com",
    company: "Microsoft",
    body: "Hey, I just wanted to get in contact to ask if you wanted to collaborate on a thung where you and I could make a film maybe or something like that like lemme know if that sounds cool and allHey, I just wanted to get in contact to ask if you wanted to collaborate on a thung where you and I could make a film maybe or something like that like lemme know if that sounds cool and all",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    opened: false,
  },
  {
    id: 4,
    name: "Dude Bro",
    email: "dude@gmail.com",
    company: "",
    body: "Hey, I just wanted to get in contact to ask if you wanted to collaborate on a thung where you and I could make a film maybe or something like that like lemme know if that sounds cool and all",
    date: new Date(new Date().setDate(new Date().getDate() - 7)),
    opened: true,
  },
  {
    id: 5,
    name: "Yesterday My Guy",
    email: "test@gmail.com",
    company: "",
    body: "Hey, I just wanted to get in contact to ask if you wanted to collaborate on a thung where you and I could make a film maybe or something like that like lemme know if that sounds cool and all",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    opened: true,
  },
  {
    id: 6,
    name: "Today Mama",
    email: "test@gmail.com",
    company: "",
    body: "Hey, I just wanted to get in contact to ask if you wanted to collaborate on a thung where you and I could make a film maybe or something like that like lemme know if that sounds cool and all",
    date: new Date(),
    opened: true,
  },
];

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
    const res = await MOCK_DATA;
    if (res) {
      const sorted = sortInquiries(res);
      inquiries.value = sorted;
    }
  };

  const loadMore = () => {
    showCount.value = showCount.value + 4;
  };

  const markAsOpened = (id: number) => {
    const found = inquiries.value.find((i: Inquiry) => i.id === id);
    if (found) found.opened = true;
  };

  const deleteInquiry = (id: number) => {
    const found = inquiries.value.findIndex((i: Inquiry) => i.id === id);
    if (found) inquiries.value.splice(found, 1);
  };

  return {
    inquiries,
    shownInquiries,
    getInquiries,
    loadMore,
    markAsOpened,
    deleteInquiry,
  };
});
