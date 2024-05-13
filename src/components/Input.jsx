import React from "react";

const Input = ({ id, onChange, value, label, type }) => {
    return (
        <div className="relative poppins-medium">
            <input
                onChange={onChange}
                value={value}
                type={type}
                id={id}
                className="
                mb-4
        block
        rounded-3xl
        px-6
        pt-6
        pb-1
        w-full
        border-2
        border-lineargreen
        text-md
      text-coswhite      bg-transparent
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1
        "
                placeholder=" "
            />
            <label
                htmlFor={id}
                className="
        absolute 
        text-md
      text-coswhite
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
