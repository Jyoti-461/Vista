const VerticalImageScroll = ({ images }) => {
  return (
    <div className="vertical-scroll rounded-2xl border border-gray-800 dark:border-gray-700">
      <div className="vertical-track p-2">
        {/* Duplicate images for seamless loop */}
        {[...images, ...images].map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className="rounded-xl object-cover w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalImageScroll;
