import classnames from 'classnames';

const Card = ({ className, color, ...props }) => (
  <div 
    className={classnames({
      [`p-6 rounded-2xl bg-${color}`]: true,
      [className]: className,
    })}
    {...props}
  />
);

Card.defaultProps = {
  color: 'gray-100',
};

export default Card;
