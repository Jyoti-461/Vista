const VerticalImageScroll = ({ images, speed = 28 }) => {
  return (
    <div className="vertical-scroll rounded-2xl border border-gray-800 dark:border-gray-700">
      <div
        className="vertical-track"
        style={{ animationDuration: `${speed}s` }}
      >
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
