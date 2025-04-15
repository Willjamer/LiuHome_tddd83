// components/SwishPayment.tsx

export default function SwishPayment() {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 border-2 border-green-300 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Betalsätt</h2>
  
        <div className="border border-gray-200 rounded-xl p-6 relative">
          <div className="absolute top-6 right-6">
            <img
              src="../../../public/images/swish-logo.svg" // Byt ut mot riktig sökväg eller import
              alt="Swish logo"
              className="w-16"
            />
          </div>
  
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-lg font-medium">Swish</span>
          </div>
  
          <hr className="my-4" />
  
          <p className="mb-4 text-gray-700">
            Fyll i mobilnumret du har kopplat till Swish. Du behöver ha Swish och BankID installerat.
          </p>
  
          <input
            type="tel"
            placeholder="Mobilnummer"
            className="w-full border border-gray-300 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>
    );
  }
  