// ProgressDisplay bileşeni, ilerleme oranını göstermek için kullanılıyor.
// progress değeri, default olarak 0 veriliyor eğer bir değer iletilmezse.
const ProgressDisplay = ({ progress = 0 }) => {
  return (
    // Dış çerçeve, tüm genişliği kapsayan bir bar şeklinde ayarlanıyor.
    // 'bg-gray-200' açık gri bir arka plan rengini, 'dark:bg-gray-700' ise karanlık modda koyu gri arka planı ifade eder.
    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
      {/* İçteki ilerleme barı. 'progress' değeri yüzde olarak genişliği belirliyor. 
      Eğer progress değeri 50 ise, bu bar genişliğinin %50'sini kapsar. */}
      <div
        className="bg-blue-600 h-3 rounded-full" // Bar mavi renkte ve yuvarlatılmış.
        style={{ width: `${progress}%` }} // Genişliği, iletilen 'progress' değerine göre ayarlanıyor.
      ></div>
    </div>
  );
};

export default ProgressDisplay;
