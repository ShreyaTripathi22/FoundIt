import React, { forwardRef } from 'react';
import { howItWorksData } from '../data/contants';
import styles from '../style';

const Workings = forwardRef((props, ref) => {
  return (
    <section ref={ref} className={`bg-black ${styles.paddingY} z-1 `}>
      <div className="max-w-6xl mx-auto px-2 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">How it Works?</h2>
        <p className="text-[17px] text-gray-400 max-w-3xl mx-auto">
          FoundIt makes it simple to report and recover lost items in public places.
          Whether you've misplaced your belongings or found something others might be searching for,
          our platform connects people quickly and securely. Post a report, explore nearby matches,
          and reclaim what's yours — all in just a few steps.
        </p>

        <div className="grid gap-8 md:gap-20 md:grid-cols-3 mt-12">
          {howItWorksData.map((step) => (
            <div
              key={step.id}
              className="bg-[#1f1f1f] rounded-2xl p-8 border border-white/10 shadow-lg flex flex-col items-center hover:scale-[1.03] transition-all"
            >
              <step.icon className="text-5xl text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Workings;
