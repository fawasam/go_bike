import quoteIcon from "../assets/quote-icon.svg";
import contactPattern from "../assets/contact-pattern.svg";
import pondiuni from "../assets/uni3.jpg"
const Testimonial = () => {
  const divStyle = {
    backgroundImage: `url(${contactPattern})`,
    backgroundSize: 'cover', // You can customize this property based on your needs
    backgroundPosition: 'center', // You can customize this property based on your needs
    // Add any other background-related styles here
    // For example, backgroundRepeat, backgroundColor, etc.
  };
  return (
    <div style={divStyle}>
      <img src={quoteIcon} alt="" className="mx-auto" />
      <h3 className="text-light-gray text-3xl text-center tracking-wider">
      "Life is like riding a bicycle. To keep your balance, you must keep moving."
      </h3>

      <p className="text-dark-gray font-bold text-center uppercase mt-[30px]">
        -albert Einstein
      </p>
    </div>
  );
};

export default Testimonial;
