import { faFire } from "@fortawesome/free-solid-svg-icons"; // FontAwesome'dan ateş ikonu getiriliyor
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // FontAwesomeIcon bileşeni React için import ediliyor

const PriorityDisplay = ({ priority }) => {
  // priority, bu bileşene prop olarak geliyor
  return (
    <div className="flex justify-start align-baseline">
      {/* İkonların hizalanması için flexbox kullanılıyor */}
      {[...Array(5)].map((_, index) => (
        // Array(5) ile 5 elemanlı bir dizi oluşturuluyor, her eleman için bir ikon render ediliyor
        <FontAwesomeIcon
          key={index} // Her bir ikon için benzersiz bir key ekleniyor
          icon={faFire} // FontAwesome'dan gelen ateş ikonu kullanılıyor
          className={`pr-1 ${
            priority > index ? "text-red-400" : "text-slate-400"
          }`}
          // Eğer priority değeri index'ten büyükse ikon kırmızı, değilse gri oluyor
        />
      ))}
    </div>
  );
};

export default PriorityDisplay; // Bileşen dışa aktarılıyor
