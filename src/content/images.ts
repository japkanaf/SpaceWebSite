import type { ImageCredit, SiteImage } from "./types";

/** Pexels photo URL resized on the Pexels CDN; next/image then serves responsive AVIF/WebP. */
function pexels(id: number, width = 1600): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

function credit(author: string, url: string): ImageCredit {
  return { author, source: "Pexels", url };
}

export const heroImage: SiteImage = {
  src: pexels(4971556, 2000),
  alt: "Врач-стоматолог консультирует пациентку в светлом кабинете клиники",
  position: "center 35%",
  credit: credit("Gustavo Fring", "https://www.pexels.com/photo/a-dentist-with-a-patient-at-a-dental-clinic-4971556/"),
};

export const aboutMainImage: SiteImage = {
  src: pexels(12427085, 1800),
  alt: "Светлый лечебный кабинет клиники с современной стоматологической установкой",
  position: "center",
  credit: credit("Arash Iyone", "https://www.pexels.com/photo/dental-clinic-12427085/"),
};

export const aboutSupportImage: SiteImage = {
  src: pexels(6812558, 1200),
  alt: "Врач-стоматолог проводит лечение на современном оборудовании",
  position: "center",
  credit: credit("Pavel Danilyuk", "https://www.pexels.com/photo/a-dentist-in-a-clinic-working-on-a-patient-6812558/"),
};

export const doctorImages = {
  sokolov: {
    src: pexels(5355867, 1200),
    alt: "Дмитрий Соколов, главный врач, хирург-имплантолог",
    position: "center 20%",
    credit: credit("Tima Miroshnichenko", "https://www.pexels.com/photo/dentist-sitting-on-a-dental-chair-5355867/"),
  },
  petrova: {
    src: pexels(31043313, 1200),
    alt: "Анна Петрова, врач-стоматолог-терапевт",
    position: "center 20%",
    credit: credit("Manuel Toledo", "https://www.pexels.com/photo/confident-female-dentist-in-professional-attire-31043313/"),
  },
  volkov: {
    src: pexels(37458044, 1200),
    alt: "Михаил Волков, врач-стоматолог-ортопед",
    position: "center 20%",
    credit: credit("Emily Gaibor", "https://www.pexels.com/photo/dentist-in-modern-dental-office-setting-37458044/"),
  },
  morozova: {
    src: pexels(7904457, 1200),
    alt: "Елена Морозова, врач-ортодонт",
    position: "center 15%",
    credit: credit("Anna Tarazevich", "https://www.pexels.com/photo/portrait-of-doctor-7904457/"),
  },
  lebedeva: {
    src: pexels(6812434, 1400),
    alt: "Ольга Лебедева, врач-стоматолог-гигиенист",
    position: "center 30%",
    credit: credit("Pavel Danilyuk", "https://www.pexels.com/photo/woman-working-at-dental-clinic-6812434/"),
  },
} satisfies Record<string, SiteImage>;

export const smileImages = {
  aesthetic: {
    src: pexels(3762402, 1800),
    alt: "Пример результата: улыбка после эстетической реставрации передних зубов",
    position: "center",
    credit: credit("Shiny Diamond", "https://www.pexels.com/photo/close-up-photo-of-woman-with-pink-lipstick-smiling-3762402/"),
  },
  whitening: {
    src: pexels(20130737, 1800),
    alt: "Пример результата: улыбка после профессионального отбеливания",
    position: "center 45%",
    credit: credit("Boko Shots", "https://www.pexels.com/photo/smiling-woman-with-white-teeth-20130737/"),
  },
  aligners: {
    src: pexels(9775440, 1800),
    alt: "Пример результата: ровная улыбка после лечения элайнерами",
    position: "center",
    credit: credit("SHVETS production", "https://www.pexels.com/photo/close-up-of-the-smile-of-a-man-9775440/"),
  },
} satisfies Record<string, SiteImage>;

export const ctaImage: SiteImage = {
  src: pexels(6809668, 1400),
  alt: "Администратор клиники встречает пациента на ресепшене",
  position: "center",
  credit: credit("Pavel Danilyuk", "https://www.pexels.com/photo/patient-with-toothache-scheduling-appointment-with-receptionist-6809668/"),
};

/** 1200×630 crop of the hero photo for link previews. */
export const ogImageUrl =
  "https://images.pexels.com/photos/4971556/pexels-photo-4971556.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop";
