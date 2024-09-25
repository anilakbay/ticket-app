"use client"; // Next.js'de bu sayfa veya bileşenin istemci tarafında çalışacağını belirtiyor

import { faX } from "@fortawesome/free-solid-svg-icons"; // FontAwesome'dan 'X' ikonunu alıyoruz (genellikle bir çarpı işareti)
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesomeIcon bileşenini kullanarak ikonları render ediyoruz
import { useRouter } from "next/navigation"; // Next.js'in yönlendirme ve sayfa yenileme işlevlerini kullanmak için Router'ı alıyoruz

const DeleteBlock = ({ id }) => {
  // id prop'u, silinecek ticket'ın ID'sini temsil ediyor
  const router = useRouter(); // router nesnesini kullanarak sayfa yönlendirme veya yenileme işlemlerini yapıyoruz

  const deleteTicket = async () => {
    // async fonksiyon, ticket'ı silme işlemi için kullanılıyor
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE", // HTTP DELETE isteği yapılıyor, belirtilen ticket ID'si üzerinden
    });
    if (res.ok) {
      // İstek başarılıysa (HTTP 200), sayfa yenileniyor
      router.refresh(); // Sayfanın yeniden yüklenmesini sağlar, silinen ticket artık görünmez
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX} // Çarpı işareti ikonu
      className=" text-red-400 hover:cursor-pointer hover:text-red-200" // İkon stilini ayarlıyoruz: kırmızı renk ve fare ile üzerine gelince renk değişimi
      onClick={deleteTicket} // İkona tıklanınca `deleteTicket` fonksiyonu çalışıyor
    />
  );
};

export default DeleteBlock;
