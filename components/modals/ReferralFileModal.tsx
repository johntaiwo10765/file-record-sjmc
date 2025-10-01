import React, { useState, useEffect } from 'react';
import { ReferralFile, NewReferralFile } from '../../types';
import { XIcon } from '../icons';

interface ReferralFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: NewReferralFile | ReferralFile) => void;
  fileToEdit: ReferralFile | null;
}

const ReferralFileModal: React.FC<ReferralFileModalProps> = ({ isOpen, onClose, onSave, fileToEdit }) => {
  const [formData, setFormData] = useState<NewReferralFile>({
    referralName: '',
    patientCount: 0,
    registrationDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0]
  });

  useEffect(() => {
    if (fileToEdit) {
      setFormData({
        referralName: fileToEdit.referralName,
        patientCount: fileToEdit.patientCount,
        registrationDate: fileToEdit.registrationDate,
        expiryDate: fileToEdit.expiryDate
      });
    } else {
      setFormData({
        referralName: '', 
        patientCount: 0,
        registrationDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0]
      });
    }
  }, [fileToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'patientCount' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileToEdit) {
      onSave({
        ...formData,
        id: fileToEdit.id,
        registrationDate: formData.registrationDate ? new Date(formData.registrationDate).toISOString().slice(0, 19).replace('T', ' ') : fileToEdit.registrationDate,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString().slice(0, 19).replace('T', ' ') : fileToEdit.expiryDate
      });
    } else {
      onSave({
        ...formData,
        registrationDate: new Date(formData.registrationDate).toISOString().slice(0, 19).replace('T', ' '),
        expiryDate: new Date(formData.expiryDate).toISOString().slice(0, 19).replace('T', ' ')
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {fileToEdit ? 'Edit Referral File' : 'Add New Referral File'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="referralName" className="block text-sm font-medium text-gray-700">Referral Name</label>
              <input type="text" name="referralName" id="referralName" value={formData.referralName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sjmc-blue-light focus:border-sjmc-blue-light sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="patientCount" className="block text-sm font-medium text-gray-700">Patients Referred</label>
              <input type="number" name="patientCount" id="patientCount" value={formData.patientCount} onChange={handleChange} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sjmc-blue-light focus:border-sjmc-blue-light sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">Registration Date</label>
              <input 
                type="date" 
                name="registrationDate" 
                id="registrationDate" 
                value={formData.registrationDate?.split('T')[0]} 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sjmc-blue-light focus:border-sjmc-blue-light sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input 
                type="date" 
                name="expiryDate" 
                id="expiryDate" 
                value={formData.expiryDate?.split('T')[0]} 
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sjmc-blue-light focus:border-sjmc-blue-light sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sjmc-blue-light">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-sjmc-blue border border-transparent rounded-md shadow-sm hover:bg-sjmc-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sjmc-blue">
              Save File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralFileModal;
