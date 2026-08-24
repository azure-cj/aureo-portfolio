"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInVariants } from "@/src/lib/animations";
import stack from "@/src/data/stack";

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Flatten all items
  const allItems = stack.flatMap((category) => category.items);
  const totalItems = allItems.length;
  const midpoint = Math.ceil(totalItems / 2);

  // Get items for specific category
  const getCategoryItems = (categoryId: string) => {
    const category = stack.find((cat) => cat.id === categoryId);
    return category?.items || [];
  };

  // Get category display name
  const getCategoryDisplayName = (categoryId: string) => {
    const category = stack.find((cat) => cat.id === categoryId);
    return category?.title || categoryId;
  };

  // Get proficiency color
  const getProficiencyColor = (proficiency: number) => {
    if (proficiency === 5) return "bg-accent";
    if (proficiency === 4) return "bg-blue-400";
    return "bg-white/30";
  };

  // Tech badge component
  const TechBadge = ({ item }: { item: (typeof allItems)[0] }) => (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/10 text-primary text-xs font-mono whitespace-nowrap hover:border-accent/40 hover:text-accent transition-colors duration-200 cursor-default">
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getProficiencyColor(
          item.proficiency ?? 3
        )}`}
      />
      {item.name}
    </span>
  );

  // Render marquee rows
  const renderMarqueeView = () => (
    <motion.div
      key="marquee"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="space-y-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Row 1: Left scroll */}
      <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className={`flex w-max gap-3 ${
            isPaused ? "marquee-left paused" : "marquee-left"
          }`}
        >
          {allItems.slice(0, midpoint).map((item) => (
            <div key={item.id}>
              <TechBadge item={item} />
            </div>
          ))}
          {allItems.slice(0, midpoint).map((item) => (
            <div key={`${item.id}-dup`}>
              <TechBadge item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Right scroll */}
      <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className={`flex w-max gap-3 ${
            isPaused ? "marquee-right paused" : "marquee-right"
          }`}
        >
          {allItems.slice(midpoint).map((item) => (
            <div key={item.id}>
              <TechBadge item={item} />
            </div>
          ))}
          {allItems.slice(midpoint).map((item) => (
            <div key={`${item.id}-dup`}>
              <TechBadge item={item} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Render filtered category view
  const renderFilteredView = () => {
    const categoryId = activeTab.toLowerCase().replace(/\s+/g, "-");
    let items: (typeof allItems)[0][] = [];

    // Map tab names to category IDs
    if (activeTab === "Languages") items = getCategoryItems("languages");
    else if (activeTab === "Frameworks & Libraries")
      items = getCategoryItems("frameworks");
    else if (activeTab === "Mobile & IoT") items = getCategoryItems("mobile-iot");
    else if (activeTab === "Tools & Platforms") items = getCategoryItems("tools");
    else if (activeTab === "Databases") items = getCategoryItems("databases");

    return (
      <motion.div
        key={`filtered-${activeTab}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="min-h-[80px] flex justify-center"
      >
        <div className="max-w-2xl flex flex-wrap gap-2 justify-center">
          {items.map((item) => (
            <div key={item.id}>
              <TechBadge item={item} />
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const tabs = [
    { label: "All", id: "all" },
    { label: "Languages", id: "languages" },
    { label: "Frameworks & Libraries", id: "frameworks" },
    { label: "Mobile & IoT", id: "mobile-iot" },
    { label: "Tools & Platforms", id: "tools" },
    { label: "Databases", id: "databases" },
  ];

  return (
    <motion.div
      className="space-y-8 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "-20px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.h2 className="heading-lg" variants={fadeInVariants}>
        Tech Stack
      </motion.h2>

      {/* Filter Tabs */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        variants={fadeInVariants}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.label)}
            className={`font-mono text-xs px-3.5 py-2 min-h-[38px] rounded-full cursor-pointer transition-all duration-200 active:scale-95 ${
              activeTab === tab.label
                ? "bg-accent text-black font-semibold"
                : "bg-surface text-muted border border-white/10 hover:border-accent/40 hover:text-primary"
            }`}
          >
            {tab.label === "All" ? (
              <>
                All <span className="text-accent ml-1">{totalItems}</span>
              </>
            ) : (
              tab.label
            )}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <motion.div variants={fadeInVariants}>
        <AnimatePresence mode="wait">
          {activeTab === "All" ? renderMarqueeView() : renderFilteredView()}
        </AnimatePresence>
      </motion.div>

      {/* Proficiency Legend */}
      <motion.div
        className="flex gap-4 justify-center mt-6 text-xs font-mono text-muted"
        variants={fadeInVariants}
      >
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          Expert
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
          Proficient
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/30" />
          Familiar
        </span>
      </motion.div>
    </motion.div>
  );
}

