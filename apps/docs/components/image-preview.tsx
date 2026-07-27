export function ImagePreview(props: any) {
  return (
    <img
      {...props}
      className='rounded-2xl shadow-md mb-4'
      style={{ maxWidth: '100%', ...props.style }}
    />
  );
}
