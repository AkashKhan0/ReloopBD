import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about}
          alt="about"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Reloop consectetur adipisicing elit. Fugiat eveniet rem nam
            necessitatibus vitae, nisi doloribus alias vel quaerat, excepturi
            sapiente laboriosam esse autem ab laborum deserunt, reiciendis fuga
            quibusdam.
          </p>
          <p>
            Consectetur adipisicing elit. Totam possimus ipsa numquam! Neque
            impedit dolore pariatur voluptatem consequuntur commodi repellendus
            deleniti sint qui maiores vitae, illum sit voluptatibus tempora,
            expedita quisquam reiciendis dolor, officiis debitis alias quidem
            tempore quam unde? Earum.
          </p>
          <b className="text-gray-800 capitalize">our mission</b>
          <p>
            Adipisicing elit. Voluptatibus ut vero alias assumenda temporibus
            delectus, laborum nulla doloribus repellendus? Aliquid eos ex, est
            cum earum in quia ullam, at quisquam vitae animi. Explicabo, harum!
            Magnam nihil explicabo ab perspiciatis voluptatem aspernatur alias,
            unde debitis. Cum tenetur quos illo fugit perferendis?
          </p>
        </div>
      </div>

      {/* why choose us */}
      <div className="text-2xl pt-8">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        {/* quality assurance */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="capitalize">quality assurance: </b>
          <p className="text-gray-600">
            Dolor quality assurance sit amet consectetur adipisicing elit.
            Molestias odit corporis ut.
          </p>
        </div>
        {/* convenience */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="capitalize">convenience: </b>
          <p className="text-gray-600">
            A convenience voluptatem sit laudantium maxime similique tempora
            unde inventore illum aliquam!
          </p>
        </div>
        {/* exceptional customer service */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="capitalize">exceptional customer service: </b>
          <p className="text-gray-600">
            Exceptional customer service consectetur laudantium maxime similique
            Quos nihil modi possimus unde!
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
