import React, { useState, useEffect } from 'react';
import { PersonalFile, NewPersonalFile, Gender } from '../../types';
import { XIcon } from '../icons';

interface PersonalFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: NewPersonalFile | PersonalFile) => void;
  fileToEdit: PersonalFile | null;
}

const PersonalFileModal: React.FC<PersonalFileModalProps> = ({ isOpen, onClose, onSave, fileToEdit }) => {
  const [formData, setFormData] = useState<NewPersonalFile>({
    name: '',
    age: 0,
    gender: Gender.Other,
  });

  useEffect(() => {
    if (fileToEdit) {
      setFormData({
        name: fileToEdit.name,
        age: fileToEdit.age,
        gender: fileToEdit.gender,
      });
    } else {
      setFormData({ name: '', age: 0, gender: Gender.Other });
    }
  }, [fileToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileToEdit) {
      onSave({ ...formData, id: fileToEdit.id, registrationDate: fileToEdit.registrationDate, expiryDate: fileToEdit.expiryDate });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XIcon className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {fileToEdit ? 'Edit Personal File' : 'Add New Personal File'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sjmc-blue-light focus:border-sjmc-blue-light sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} required min="0" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sjmc-blue-light focus:border-sjmc-blue-light sm:text-sm"/>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" id="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sjmc-blue-light focus:border-sjmc-blue-light sm:text-sm">
                {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
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

export default PersonalFileModal;
