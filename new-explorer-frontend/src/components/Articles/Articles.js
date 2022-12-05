export default function Articles({ children }) {
  return (
    <section className='articles'>
      <div className='articles__container'>{children}</div>
    </section>
  );
}
