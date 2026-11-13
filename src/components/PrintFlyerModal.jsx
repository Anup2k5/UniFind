import React from 'react';
import { X, Printer, Download, QrCode, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatDate } from '../utils/helpers';

export const PrintFlyerModal = () => {
  const { printFlyerItem, setPrintFlyerItem } = useApp();

  if (!printFlyerItem) return null;

  const item = printFlyerItem;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Controls Bar (hidden during actual paper print) */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Campus Notice Board Flyer Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-campus-600 hover:bg-campus-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
            <button
              onClick={() => setPrintFlyerItem(null)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Flyer Sheet (ID: printable-flyer) */}
        <div id="printable-flyer" className="p-8 sm:p-10 bg-white text-slate-900 font-sans space-y-6">
          
          {/* Header */}
          <div className="border-b-4 border-slate-900 pb-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-black tracking-widest uppercase text-slate-500">
                APEX STATE UNIVERSITY • CAMPUS RECOVERY BULLETIN
              </div>
              <h1 className={`text-4xl font-black uppercase tracking-tight mt-1 ${
                item.type === 'lost' ? 'text-rose-600' : 'text-blue-600'
              }`}>
                {item.type === 'lost' ? 'MISSING / LOST' : 'FOUND ON CAMPUS'}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold font-mono">ID: {item.id}</div>
              <div className="text-xs text-slate-500">{formatDate(item.date)}</div>
            </div>
          </div>

          {/* Photo */}
          <div className="w-full h-64 rounded-2xl overflow-hidden border-2 border-slate-900">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Item Title & Location */}
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {item.title}
            </h2>
            <div className="mt-2 text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span>📍 Location: <strong>{item.location}</strong></span>
              {item.specificLocation && <span>({item.specificLocation})</span>}
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-800 leading-relaxed">
            <strong className="block text-xs uppercase text-slate-500 mb-1">Description:</strong>
            {item.description}
          </div>

          {/* Footer with QR Code & Contact */}
          <div className="border-t-2 border-slate-900 pt-6 flex items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
                To Claim or Return This Item:
              </div>
              <p className="text-sm font-bold text-slate-900">
                Scan QR code or visit: unifind.campus.edu/item/{item.id}
              </p>
              <p className="text-xs text-slate-500">
                Reported by {item.reporter?.name} • Campus Safety Helpdesk: (555) 019-9111
              </p>
            </div>

            {/* QR Mockup */}
            <div className="w-20 h-20 bg-slate-900 rounded-xl p-2 flex flex-col items-center justify-center text-white flex-shrink-0">
              <QrCode className="w-12 h-12" />
              <span className="text-[8px] font-mono mt-0.5 font-bold">UNIFIND</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
