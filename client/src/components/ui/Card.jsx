const Card = ({ children, className = "" }) => {
    return (
        <div
            className={`
        neu-card
        p-6
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;