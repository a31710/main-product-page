export default function About() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          Welcome to our Job Listings platform, your trusted partner in connecting talented
          professionals with exciting career opportunities.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h2>
          <p>
            We are committed to simplifying the job search process by providing a user-friendly
            platform that brings together employers and job seekers. Our goal is to make finding the
            perfect job as seamless and efficient as possible.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Comprehensive job listings across various industries</li>
            <li>Advanced search and filtering capabilities</li>
            <li>Easy application process</li>
            <li>Regular updates with new opportunities</li>
            <li>User-friendly interface for seamless navigation</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h2>
          <p>
            We believe in transparency, efficiency, and putting people first. Our platform is built
            on the foundation of trust and dedication to helping individuals find their dream
            careers while assisting companies in discovering exceptional talent.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Have questions or feedback? Feel free to reach out to us through our contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
