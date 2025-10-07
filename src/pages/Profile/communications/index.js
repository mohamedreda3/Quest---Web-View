import React, { useEffect, useState } from 'react';

const Communications = () => {
  const [choosed, setChoosed] = useState([]);
  const chooses = [
    {
      id: 1,
      description: "Weekly personalized course recommendations.",
    },
    {
      id: 2,
      description:
        "Weekly notifications about promotions, new courses, and special events.",
    },
    {
      id: 3,
      description: "Information about online lectures.",
    },
    {
      id: 4,
      description: "Surveys and invitations to help us improve our content.",
    },
  ];

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const alreadySelected = choosed.some((item) => item === selectedId);
    if (alreadySelected) {
      setChoosed(choosed.filter((item) => item !== selectedId));
    } else {
      setChoosed([...choosed, selectedId]);
    }
  };

  useEffect(() => {
    console.log(choosed);
  }, [choosed]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="payment">
      <div className="form">
        <div className="communicateObjects">
          {chooses.map((item, index) => {
            const isSelected = choosed.includes(item.id);
            return (
              <div
                key={item.id}
                className="objectsComm"
                onClick={() => handleSelect({ target: { value: item.id } })}
              >
                <div className="choosedComm">
                  <img
                    src={
                      isSelected
                        ? "https://res.cloudinary.com/duovxefh6/image/upload/v1709806116/3a649c73-b948-4a4f-8a9b-28ce44b29b5d.png"
                        : "https://res.cloudinary.com/duovxefh6/image/upload/v1709806408/f4c6e297-f175-48a7-920a-0639bff38f22.png"
                    }
                    alt=""
                    width={33}
                  />
                </div>
                <div className="commLabel">{item.description}</div>
              </div>
            );
          })}
        </div>
      </div>
      <button type="submit" className="defultButtonStyle">
        Save
      </button>
    </form>
  );
};

export default Communications;
