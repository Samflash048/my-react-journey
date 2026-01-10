function Contact() {
  return (
    <div className="p-10 max-w-2xl mx-auto mt-10 border shadow-lg rounded-xl bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Support</h1>
      <form className="space-y-4">
        <input className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="email" placeholder="Your Email" />
        <textarea className="w-full border border-gray-300 p-3 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we help?"></textarea>
        <button className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 w-full">Send Message</button>
      </form>
    </div>
  );
}
export default Contact;