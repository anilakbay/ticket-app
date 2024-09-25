// Mongoose kütüphanesini ve Schema'yi içe aktarma
import mongoose, { Schema } from "mongoose";

// MongoDB bağlantısını kurma
mongoose.connect(process.env.MONGODB_URI, {
  // Bağlantı URI'sini .env dosyasından alır
  useNewUrlParser: true, // Yeni URL analizci kullan
  useUnifiedTopology: true, // Yeni topoloji yönetimini kullan
});

// Global Promise ayarı
mongoose.Promise = global.Promise; // Mongoose'un global Promise kullanmasını sağlar

// Ticket şemasını tanımlama
const ticketSchema = new Schema(
  {
    title: { type: String, required: true }, // Başlık, zorunlu alan
    description: { type: String, required: true }, // Açıklama, zorunlu alan
    category: { type: String, required: true }, // Kategori, zorunlu alan
    priority: { type: Number, min: 0, max: 5, default: 0 }, // Öncelik, 0-5 arasında ve varsayılan değeri 0
    progress: { type: Number, min: 0, max: 100, default: 0 }, // İlerleme, 0-100 arasında ve varsayılan değeri 0
    status: {
      type: String,
      enum: ["not started", "started", "done"],
      default: "not started",
    }, // Durum, belirli değerlerden biri olmalı
    active: { type: Boolean, default: true }, // Aktiflik durumu, varsayılan değeri true
  },
  {
    timestamps: true, // Oluşturulma ve güncellenme tarihlerini otomatik olarak ekler
  }
);

// Ticket modelini tanımlama
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema); // Eğer model daha önce tanımlandıysa onu kullan

// Ticket modelini dışa aktarma
export default Ticket;
