const Decrations = ({
  formData,
  handleChange,
  parentSignaturePreview,
  candidateSignaturePreview,
  handleSignatureChange,
 
}) => {
  return (
    <section className="bg-blue-50 p-6 rounded-lg shadow-sm">
      <h2 className="lg:text-xl font-semibold text-blue-700 mb-4">
        Candidate Declaration
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:text-base text-xs">
        <div>
          <label
            htmlFor="candidateDeclarationPlace"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Place
          </label>
          <input
            type="text"
            name="candidateDeclaration.place"
            id="candidateDeclarationPlace"
            value={formData.candidateDeclaration.place}
            onChange={handleChange}
            placeholder="Place of declaration"
            className="input w-full p-2"
          />
        </div>
        <div>
          <label
            htmlFor="candidateDeclarationDate"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Date
          </label>
          <input
            type="date"
            name="candidateDeclaration.date"
            id="candidateDeclarationDate"
            value={formData.candidateDeclaration.date}
            onChange={handleChange}
            className="input w-full p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium mb-1">
            Candidate Signature
          </label>
          <input
            type="file"
            name="candidateDeclaration.signatureImage"
            id="candidateDeclarationSignature"
            accept="image/*"
            onChange={(e) => handleSignatureChange(e, "candidateDeclaration")}
            className="border rounded p-2"
          />

          {candidateSignaturePreview && (
            <img
              src={candidateSignaturePreview}
              alt="Candidate signature preview"
              className="mt-2 h-20 w-20 object-contain border rounded"
            />
          )}
        </div>
      </div>

      <h2 className="lg:text-xl font-semibold text-blue-700 mt-8 mb-4 ">
        Parent Declaration
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:text-base text-xs">
        <div>
          <label
            htmlFor="parentDeclarationPlace"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Place
          </label>
          <input
            type="text"
            name="parentDeclaration.place"
            id="parentDeclarationPlace"
            value={formData.parentDeclaration.place}
            onChange={handleChange}
            placeholder="Place of parent signature"
            className="input w-full p-2"
          />
        </div>
        <div>
          <label
            htmlFor="parentDeclarationDate"
            className="block text-gray-700 text-sm font-medium mb-1"
          >
            Date
          </label>
          <input
            type="date"
            name="parentDeclaration.date"
            id="parentDeclarationDate"
            value={formData.parentDeclaration.date}
            onChange={handleChange}
            className="input w-full p-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium mb-1">Parent Signature</label>
          <input
            type="file"
            name="parentDeclaration.signatureImage"
            id="parentDeclarationSignature"
            accept="image/*"
            onChange={(e) => handleSignatureChange(e, "parentDeclaration")}
            className="border rounded p-2"
          />

          {parentSignaturePreview && (
            <img
              src={parentSignaturePreview} // Corrected this line to use parentSignaturePreview
              alt="Parent signature preview"
              className="mt-2 h-20 w-20 object-contain border rounded"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Decrations;
