type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/** Standard page width: 1120px, with responsive side padding. */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
