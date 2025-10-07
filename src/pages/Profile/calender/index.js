import React, { useEffect, useState } from 'react';

const Calender = () => {
  const [choosed, setChoosed] = useState([]);
  const chooses = [
    {
      id: 1,
      description: "Google Calender",
    },
    {
      id: 2,
      description: "App Calender",
    },
    {
      id: 3,
      description: "Other Calender",
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
      <p>
        Automatically sync all the deadlines and other related items from all
        active your calendar
      </p>
      <div className="form">
        <h6>Add To My Calender</h6>
        <div className="communicateObjects calender">
          {chooses.map((item, index) => {
            const isSelected = choosed.includes(item.id);
            return (
              <div
                key={item.id}
                className="objectsComm"
                onClick={() => handleSelect({ target: { value: item.id } })}
              >
                <button
                  type="submit"
                  className={isSelected ? "defultButtonStyle" : "saveStyle"}
                >
                  {item?.description}
                </button>
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

export default Calender;
