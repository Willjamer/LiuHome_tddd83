import React from "react";

const HoverableSteps: React.FC = () => {
  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
      {/* Step 1 */}
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition duration-300">
        <h3 className="text-xl font-bold mb-2 text-center">
          1. Create an Account
        </h3>
        <p className="text-sm text-center">
          Sign up and create your profile to get started with liuHome.
        </p>
      </div>

      {/* Step 2 */}
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition duration-300">
        <h3 className="text-xl font-bold mb-2 text-center">
          2. Browse Listings
        </h3>
        <p className="text-sm text-center">
          Explore available housing options and use filters to narrow your
          search.
        </p>
      </div>

      {/* Step 3 */}
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition duration-300">
        <h3 className="text-xl font-bold mb-2 text-center">
          3. Contact Landlords
        </h3>
        <p className="text-sm text-center">
          Reach out to landlords directly through our secure messaging system.
        </p>
      </div>

      {/* Step 4 */}
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 transition duration-300">
        <h3 className="text-xl font-bold mb-2 text-center">
          4. List Your Property
        </h3>
        <p className="text-sm text-center">
          If you're a landlord, list your property to reach potential tenants.
        </p>
      </div>
    </section>
  );
};

export default HoverableSteps;
