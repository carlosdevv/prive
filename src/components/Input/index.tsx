type InputProps = {
  hasRightIcon?: () => void
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ hasRightIcon, ...rest }: InputProps) => {

  return (
    <fieldset className="mx-auto w-full flex flex-col justify-start">
      <div className="flex grow shrink-0 rounded-lg px-3 text-[14px] leading-none shadow-[0_0_0_1px] shadow-[--border] h-11 focus:shadow-[0_0_0_2px] focus:shadow-[--border] outline-none">
        <>
          <input
            className="w-full bg-transparent text-[--text] focus:outline-none"
            {...rest}
          />
          {hasRightIcon && hasRightIcon()}
        </>
      </div>
    </fieldset>
  );
}

export { Input }