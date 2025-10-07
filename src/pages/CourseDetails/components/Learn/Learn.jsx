import styles from "./Learn.module.css";

export default function Learn({ course }) {
  return (
    <section className="px-10 my-8 text-[#597B82] learn-page">
      <h2 className="text-lg font-normal my-4">What you'll learn?</h2>
      <div className="flex gap-7 px-4">
        <div className="flex flex-wrap w-100 gap-7">
          {course?.what_you_learn?.map((item) => {
            return (
              <div className="flex gap-4 align-middle align-items-start">
                <div className={``}>
                  <div className="rounded-full border border-[#5046c4]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#597B82"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-[11px] font-medium">{item?.content}</p>
              </div>
            );
          })}
        </div>

        {/* <div className="flex flex-col gap-7">
          <div className="flex gap-4 align-middle">
            <div className={` ${styles.circle}`}>
              <div className="rounded-full border border-[#5046c4]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#597B82"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] font-medium">
              Anatomy and Physiology: A deep understanding of human anatomy and
              physiology is crucial for surgery. Students will learn about the
              structure and function of the human body, with a focus on the
              anatomical layers, organs, and systems they will encounter during
              surgery. This knowledge is critical for avoiding complications and
              ensuring the safety of surgical interventions.
            </p>
          </div>

          <div className="flex gap-4 align-middle">
            <div className={` ${styles.circle}`}>
              <div className="rounded-full border border-[#5046c4]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#597B82"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-[11px] font-medium">
              Critical Thinking and Decision Making: Surgical education trains
              stu-dents to make quick, informed decisions in high-pressure
              situations. This involves assessing patient conditions,
              interpreting diagnostic tests, de-ciding on the best surgical
              approach, and managing any unforeseen issues that arise during
              surgery. Ethical considerations and the ability to work as part of
              a multidisciplinary team are also important aspects of the
              curriculum.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
