type FieldProps = {
  label: string
  large?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

function Field({ label, large, className, id, ...props }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-wider text-ink-muted"
      >
        {label}
      </label>
      <input
        id={id}
        className={[
          'mt-1 w-full border-b border-border bg-transparent py-2 text-ink focus:border-ink focus:outline-none',
          large ? 'text-2xl font-extrabold tracking-tight' : '',
          className ?? '',
        ].join(' ')}
        {...props}
      />
    </div>
  )
}

export default Field
