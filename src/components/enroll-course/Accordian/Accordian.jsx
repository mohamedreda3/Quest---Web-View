import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaTwitter } from "react-icons/fa6";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function DefaultAccordion() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        className="bg-white px-6 rounded-2xl mt-6 shadow-lg"
      >
        <AccordionHeader onClick={() => handleOpen(1)}>
          <div className="flex flex-col">
            <p className="text-sm text-[#597B82]">Breast Surgery</p>
            <p className="text-[11px] text-[#597B82]">
              Module 1 . 6 hours to complete
            </p>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[11px] text-[#597B82]">
            The breast surgery module is designed to provide comprehensive
            training in the surgical management of breast diseases, encompassing
            both benign conditions and breast cancer.
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full  bg-white shadow-blue-gray-200  flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">7 videos</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">34 MCQ</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">27 Flash Card</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
                
              </div>
              <p className="text-[#597B82] h-fit my-auto">7 videos</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
              <FaTwitter  className="w-5 h-5  my-auto text-[#5046c4]"/>
              </div>
              <p className="text-[#597B82] h-fit my-auto">12 Tweet</p>
            </div>
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={open === 2}
        icon={<Icon id={2} open={open} />}
        className="bg-white px-6 rounded-2xl mt-6 shadow-2xl"
      >
        <AccordionHeader onClick={() => handleOpen(2)}>
          <div className="flex flex-col">
            <p className="text-sm text-[#597B82]">Thyroid Surgery</p>
            <p className="text-[11px] text-[#597B82]">
              Module 2 . 13 hours to complet
            </p>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[11px] text-[#597B82]">
            The breast surgery module is designed to provide comprehensive
            training in the surgical management of breast diseases, encompassing
            both benign conditions and breast cancer.
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full  bg-white shadow-blue-gray-200  flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">7 videos</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">34 MCQ</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">27 Flash Card</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
                
              </div>
              <p className="text-[#597B82] h-fit my-auto">7 videos</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
              <FaTwitter  className="w-5 h-5  my-auto text-[#5046c4]"/>
              </div>
              <p className="text-[#597B82] h-fit my-auto">12 Tweet</p>
            </div>
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={open === 3}
        icon={<Icon id={3} open={open} />}
        className="bg-white px-6 rounded-2xl mt-6 shadow-2xl"
      >
        <AccordionHeader onClick={() => handleOpen(3)}>
          <div className="flex flex-col">
            <p className="text-sm text-[#597B82]">Salivary Gland Surgery</p>
            <p className="text-[11px] text-[#597B82]">
              Module 2 . 13 hours to complet
            </p>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <p className="text-[11px] text-[#597B82]">
            The breast surgery module is designed to provide comprehensive
            training in the surgical management of breast diseases, encompassing
            both benign conditions and breast cancer.
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full  bg-white shadow-blue-gray-200  flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">7 videos</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">34 MCQ</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path
                    fillRule="evenodd"
                    d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-[#597B82] h-fit my-auto">27 Flash Card</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#5046c4"
                  className="w-5 h-5  my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                    clipRule="evenodd"
                  />
                </svg>
                
              </div>
              <p className="text-[#597B82] h-fit my-auto">7 videos</p>
            </div>
            <div className="flex gap-2 align-middle shadow-2xl accordian-icons">
              <div className="w-7 h-7 rounded-full shadow-2xl bg-white flex justify-center align-middle">
              <FaTwitter  className="w-5 h-5  my-auto text-[#5046c4]"/>
              </div>
              <p className="text-[#597B82] h-fit my-auto">12 Tweet</p>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
}
