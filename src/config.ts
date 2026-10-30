/** Semua data undangan ada di sini. Ubah di satu tempat saja. */
export const config = {
  nickname: "Rafi",
  fullName: "Rafi Radhika Alfarizki",
  parents: "Didik (Odeng) & Lina Lisnawati",
  event: {
    start: "2026-11-08T07:00:00+07:00",
    end: "2026-11-08T15:00:00+07:00",
    dateLabel: "Minggu, 8 November 2026",
    timeLabel: "Pukul 07.00 s/d 15.00 WIB",
    venue: "Dusun Peusar, Desa Baginda",
    address: "Jln. Pagar Betis, Dusun Peusar, Desa Baginda RT 03/RW 05, Sumedang Selatan",
    mapsQuery: "Dusun Peusar, Desa Baginda, Sumedang Selatan",
    entertainment: "Hiburan: Musik Organ Tunggal & Hadroh Matro’atus Sa’adah",
  },
  ayat: {
    arab: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    arti: "“Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan salat. Ya Tuhan kami, perkenankanlah doaku.”",
    sumber: "QS. Ibrahim: 40",
  },
  gift: { bank: "BCA", number: "7741176941", holder: "Didik Adeng" },
  photo: "/img/rafi.jpg",
  gallery: ["/img/gallery-1.jpg", "/img/gallery-2.jpg"],
  music: "/audio/music.mp3",
} as const;
