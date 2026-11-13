import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  Upload,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ClaimModal = () => {
  const {
    claimModalItem,
    setClaimModalItem,
    submitClaim,
    currentUser
  } = useApp();

  const [proofAnswers, setProofAnswers] = useState('');
  const [proofImage, setProofImage] = useState('');
  const [agreed, setAgreed] = useState(false);

  if (!claimModalItem) return null;

  const item = claimModalItem;

  const handleProofImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!proofAnswers.trim()) {
      alert('Please provide proof or details that confirm your ownership.');
      return;
    }

    submitClaim({
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.image,
      proofAnswers: proofAnswers.trim(),
      proofImage: proofImage || null
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-campus-100 dark:bg-campus-900/60 text-campus-600 dark:text-campus-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Submit Ownership Claim
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verify that you are the rightful owner of this campus item
              </p>
            </div>
          </div>
          <button
            onClick={() => setClaimModalItem(null)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Summary Preview */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Found at: {item.location}
            </p>
            {item.safeZone && (
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                Held at: {item.safeZone}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          
          {/* Security Question if specified by finder */}
          {item.verificationQuestion && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                <Lock className="w-3.5 h-3.5" />
                Finder's Ownership Challenge Question:
              </div>
              <p className="text-xs italic text-amber-800 dark:text-amber-400 mt-1 font-medium">
                "{item.verificationQuestion}"
              </p>
            </div>
          )}

          {/* Proof Answers */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Your Proof of Ownership *
            </label>
            <textarea
              required
              rows={4}
              value={proofAnswers}
              onChange={(e) => setProofAnswers(e.target.value)}
              placeholder="Answer the question above, or describe details only the true owner would know: serial number, passwords/lockscreen text, stickers, contents of bag/wallet, receipts, etc."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-campus-500 text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          {/* Optional Proof Image / Receipt */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Optional Supporting Proof (Photo of Receipt, Box, or Matching Key/Item)
            </label>
            <div className="flex items-center gap-3">
              {proofImage && (
                <img
                  src={proofImage}
                  alt="Proof preview"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-300"
                />
              )}
              <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors">
                <Upload className="w-4 h-4 text-campus-500" />
                <span>{proofImage ? 'Change Proof Image' : 'Upload Verification Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProofImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Student Identity Confirmation */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              Claimant Credentials:
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              {currentUser.name} ({currentUser.studentId})
            </div>
            <div className="text-slate-500 text-[11px]">
              University Email: {currentUser.email}
            </div>
          </div>

          {/* Honor code acknowledgment */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-campus-600 focus:ring-campus-500 border-slate-300"
              />
              <span className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                I solemnly certify under the University Student Code of Conduct that I am the genuine owner of this property. False claims will be reported to Campus Student Affairs.
              </span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setClaimModalItem(null)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!agreed}
              className={`px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all ${
                agreed
                  ? 'bg-campus-600 hover:bg-campus-700 shadow-campus-600/25 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed opacity-60'
              }`}
            >
              Submit Claim for Review
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
