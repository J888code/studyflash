// Pre-made GCSE Decks - Comprehensive Collection
const GCSEDecks = [
    // MATHS
    {
        id: 'gcse-maths-formulas',
        name: 'Maths - Key Formulas',
        subject: 'maths',
        isPremade: true,
        cards: [
            { id: 'm1', front: 'Area of a circle', back: 'A = πr²' },
            { id: 'm2', front: 'Circumference of a circle', back: 'C = 2πr or C = πd' },
            { id: 'm3', front: 'Pythagoras theorem', back: 'a² + b² = c²' },
            { id: 'm4', front: 'Quadratic formula', back: 'x = (-b ± √(b²-4ac)) / 2a' },
            { id: 'm5', front: 'Area of a triangle', back: 'A = ½ × base × height' },
            { id: 'm6', front: 'Volume of a cylinder', back: 'V = πr²h' },
            { id: 'm7', front: 'Volume of a sphere', back: 'V = (4/3)πr³' },
            { id: 'm8', front: 'Surface area of a sphere', back: 'A = 4πr²' },
            { id: 'm9', front: 'Sine rule', back: 'a/sin(A) = b/sin(B) = c/sin(C)' },
            { id: 'm10', front: 'Cosine rule', back: 'a² = b² + c² - 2bc×cos(A)' },
            { id: 'm11', front: 'Gradient of a line', back: 'm = (y₂ - y₁) / (x₂ - x₁)' },
            { id: 'm12', front: 'Equation of a straight line', back: 'y = mx + c (m = gradient, c = y-intercept)' },
            { id: 'm13', front: 'Area of a trapezium', back: 'A = ½(a + b) × h' },
            { id: 'm14', front: 'Volume of a cone', back: 'V = (1/3)πr²h' },
            { id: 'm15', front: 'Compound interest formula', back: 'A = P(1 + r/100)ⁿ' },
            { id: 'm16', front: 'Area of a sector', back: 'A = (θ/360) × πr²' },
            { id: 'm17', front: 'Arc length', back: 'L = (θ/360) × 2πr' },
            { id: 'm18', front: 'Volume of a prism', back: 'V = Area of cross-section × length' },
            { id: 'm19', front: 'Speed formula', back: 'Speed = Distance ÷ Time' },
            { id: 'm20', front: 'Density formula', back: 'Density = Mass ÷ Volume' }
        ]
    },

    // BIOLOGY
    {
        id: 'gcse-biology-cells',
        name: 'Biology - Cell Structure',
        subject: 'science',
        isPremade: true,
        cards: [
            { id: 'b1', front: 'Function of the nucleus', back: 'Contains genetic material (DNA) and controls cell activities' },
            { id: 'b2', front: 'Function of mitochondria', back: 'Site of aerobic respiration - produces energy (ATP)' },
            { id: 'b3', front: 'Function of ribosomes', back: 'Site of protein synthesis' },
            { id: 'b4', front: 'Function of cell membrane', back: 'Controls what enters and leaves the cell' },
            { id: 'b5', front: 'Function of cytoplasm', back: 'Jelly-like substance where chemical reactions occur' },
            { id: 'b6', front: 'Function of chloroplasts', back: 'Site of photosynthesis - contains chlorophyll' },
            { id: 'b7', front: 'Function of cell wall (plants)', back: 'Provides structure and support to plant cells' },
            { id: 'b8', front: 'Function of vacuole (plants)', back: 'Contains cell sap, keeps cell turgid' },
            { id: 'b9', front: 'What is diffusion?', back: 'Movement of particles from high to low concentration' },
            { id: 'b10', front: 'What is osmosis?', back: 'Movement of water from dilute to concentrated solution through a partially permeable membrane' },
            { id: 'b11', front: 'What is active transport?', back: 'Movement of substances against concentration gradient using energy' },
            { id: 'b12', front: 'Photosynthesis equation', back: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂' },
            { id: 'b13', front: 'Aerobic respiration equation', back: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy' },
            { id: 'b14', front: 'Anaerobic respiration (animals)', back: 'Glucose → Lactic acid + Energy' },
            { id: 'b15', front: 'Anaerobic respiration (plants/yeast)', back: 'Glucose → Ethanol + Carbon dioxide + Energy' }
        ]
    },

    // BIOLOGY - Human Body
    {
        id: 'gcse-biology-body',
        name: 'Biology - Human Body Systems',
        subject: 'science',
        isPremade: true,
        cards: [
            { id: 'hb1', front: 'Function of red blood cells', back: 'Transport oxygen around the body using haemoglobin' },
            { id: 'hb2', front: 'Function of white blood cells', back: 'Fight infection - phagocytosis, antibodies, antitoxins' },
            { id: 'hb3', front: 'Function of platelets', back: 'Help blood clot at wound sites' },
            { id: 'hb4', front: 'Function of plasma', back: 'Transports blood cells, nutrients, CO₂, urea, hormones' },
            { id: 'hb5', front: 'What are arteries?', back: 'Blood vessels carrying blood AWAY from the heart (thick walls, no valves)' },
            { id: 'hb6', front: 'What are veins?', back: 'Blood vessels carrying blood TO the heart (thin walls, have valves)' },
            { id: 'hb7', front: 'What are capillaries?', back: 'Tiny blood vessels where exchange of substances occurs (one cell thick)' },
            { id: 'hb8', front: 'Function of the heart', back: 'Pump blood around the body in a double circulatory system' },
            { id: 'hb9', front: 'Function of the lungs', back: 'Gas exchange - oxygen in, carbon dioxide out' },
            { id: 'hb10', front: 'Function of the liver', back: 'Produces bile, detoxification, stores glucose as glycogen' },
            { id: 'hb11', front: 'Function of the kidneys', back: 'Filter blood, remove urea, control water balance' },
            { id: 'hb12', front: 'Function of the small intestine', back: 'Digestion and absorption of nutrients' },
            { id: 'hb13', front: 'Function of the large intestine', back: 'Absorbs water from undigested food' },
            { id: 'hb14', front: 'What is homeostasis?', back: 'Maintaining a constant internal environment' },
            { id: 'hb15', front: 'Function of insulin', back: 'Lowers blood glucose by converting glucose to glycogen' }
        ]
    },

    // CHEMISTRY
    {
        id: 'gcse-chemistry-atoms',
        name: 'Chemistry - Atomic Structure',
        subject: 'science',
        isPremade: true,
        cards: [
            { id: 'c1', front: 'What is an atom?', back: 'The smallest part of an element that can exist' },
            { id: 'c2', front: 'What are protons?', back: 'Positive particles in the nucleus (mass = 1)' },
            { id: 'c3', front: 'What are neutrons?', back: 'Neutral particles in the nucleus (mass = 1)' },
            { id: 'c4', front: 'What are electrons?', back: 'Negative particles orbiting the nucleus (mass ≈ 0)' },
            { id: 'c5', front: 'What is atomic number?', back: 'Number of protons in an atom' },
            { id: 'c6', front: 'What is mass number?', back: 'Number of protons + neutrons' },
            { id: 'c7', front: 'What are isotopes?', back: 'Atoms of same element with different numbers of neutrons' },
            { id: 'c8', front: 'What is an ion?', back: 'An atom that has gained or lost electrons' },
            { id: 'c9', front: 'Electron configuration rule', back: '2, 8, 8 - first shell holds 2, next shells hold 8' },
            { id: 'c10', front: 'What is ionic bonding?', back: 'Transfer of electrons between metals and non-metals' },
            { id: 'c11', front: 'What is covalent bonding?', back: 'Sharing of electrons between non-metals' },
            { id: 'c12', front: 'What is metallic bonding?', back: 'Positive metal ions in a sea of delocalised electrons' },
            { id: 'c13', front: 'Group 1 elements are called?', back: 'Alkali metals' },
            { id: 'c14', front: 'Group 7 elements are called?', back: 'Halogens' },
            { id: 'c15', front: 'Group 0 elements are called?', back: 'Noble gases' }
        ]
    },

    // CHEMISTRY - Reactions
    {
        id: 'gcse-chemistry-reactions',
        name: 'Chemistry - Chemical Reactions',
        subject: 'science',
        isPremade: true,
        cards: [
            { id: 'cr1', front: 'What is an exothermic reaction?', back: 'A reaction that releases heat energy to surroundings (temperature rises)' },
            { id: 'cr2', front: 'What is an endothermic reaction?', back: 'A reaction that absorbs heat energy from surroundings (temperature falls)' },
            { id: 'cr3', front: 'What is activation energy?', back: 'The minimum energy needed for a reaction to occur' },
            { id: 'cr4', front: 'What is a catalyst?', back: 'A substance that speeds up a reaction without being used up' },
            { id: 'cr5', front: 'What is rate of reaction?', back: 'How fast reactants are converted into products' },
            { id: 'cr6', front: 'How does temperature affect rate?', back: 'Higher temperature = faster rate (more kinetic energy, more collisions)' },
            { id: 'cr7', front: 'How does concentration affect rate?', back: 'Higher concentration = faster rate (more particles, more collisions)' },
            { id: 'cr8', front: 'How does surface area affect rate?', back: 'Larger surface area = faster rate (more particles exposed)' },
            { id: 'cr9', front: 'What is oxidation?', back: 'Loss of electrons (or gain of oxygen)' },
            { id: 'cr10', front: 'What is reduction?', back: 'Gain of electrons (or loss of oxygen)' },
            { id: 'cr11', front: 'Metal + Acid →', back: 'Salt + Hydrogen' },
            { id: 'cr12', front: 'Metal oxide + Acid →', back: 'Salt + Water' },
            { id: 'cr13', front: 'Metal carbonate + Acid →', back: 'Salt + Water + Carbon dioxide' },
            { id: 'cr14', front: 'What is electrolysis?', back: 'Using electricity to break down ionic compounds' },
            { id: 'cr15', front: 'What happens at the cathode?', back: 'Reduction - positive ions gain electrons' }
        ]
    },

    // PHYSICS
    {
        id: 'gcse-physics-forces',
        name: 'Physics - Forces & Motion',
        subject: 'science',
        isPremade: true,
        cards: [
            { id: 'p1', front: 'Speed formula', back: 'Speed = Distance ÷ Time' },
            { id: 'p2', front: 'Acceleration formula', back: 'a = (v - u) ÷ t (change in velocity ÷ time)' },
            { id: 'p3', front: 'Force formula (Newton\'s 2nd law)', back: 'F = m × a (Force = mass × acceleration)' },
            { id: 'p4', front: 'Weight formula', back: 'W = m × g (Weight = mass × gravitational field strength)' },
            { id: 'p5', front: 'Work done formula', back: 'W = F × d (Work = Force × distance)' },
            { id: 'p6', front: 'Power formula', back: 'P = W ÷ t (Power = Work done ÷ time)' },
            { id: 'p7', front: 'Kinetic energy formula', back: 'KE = ½ × m × v²' },
            { id: 'p8', front: 'Gravitational potential energy', back: 'GPE = m × g × h' },
            { id: 'p9', front: 'Newton\'s First Law', back: 'An object remains at rest or constant velocity unless acted on by a force' },
            { id: 'p10', front: 'Newton\'s Third Law', back: 'For every action there is an equal and opposite reaction' },
            { id: 'p11', front: 'What is momentum?', back: 'Momentum = mass × velocity (p = mv)' },
            { id: 'p12', front: 'Conservation of momentum', back: 'Total momentum before = Total momentum after (in closed system)' },
            { id: 'p13', front: 'Stopping distance =', back: 'Thinking distance + Braking distance' },
            { id: 'p14', front: 'Pressure formula', back: 'P = F ÷ A (Pressure = Force ÷ Area)' },
            { id: 'p15', front: 'Density formula', back: 'ρ = m ÷ V (Density = mass ÷ volume)' }
        ]
    },

    // PHYSICS - Waves & Electricity
    {
        id: 'gcse-physics-waves',
        name: 'Physics - Waves & Electricity',
        subject: 'science',
        isPremade: true,
        cards: [
            { id: 'pw1', front: 'Wave speed equation', back: 'v = f × λ (speed = frequency × wavelength)' },
            { id: 'pw2', front: 'What is frequency?', back: 'Number of waves per second, measured in Hertz (Hz)' },
            { id: 'pw3', front: 'What is wavelength?', back: 'Distance from one point on a wave to the same point on the next wave' },
            { id: 'pw4', front: 'What is amplitude?', back: 'Maximum displacement from the rest position' },
            { id: 'pw5', front: 'Transverse wave example', back: 'Light, water waves - oscillations perpendicular to direction of travel' },
            { id: 'pw6', front: 'Longitudinal wave example', back: 'Sound - oscillations parallel to direction of travel' },
            { id: 'pw7', front: 'Electromagnetic spectrum order', back: 'Radio, Microwave, Infrared, Visible, UV, X-ray, Gamma' },
            { id: 'pw8', front: 'Ohm\'s Law', back: 'V = I × R (Voltage = Current × Resistance)' },
            { id: 'pw9', front: 'Power formula (electrical)', back: 'P = I × V (Power = Current × Voltage)' },
            { id: 'pw10', front: 'Energy transferred formula', back: 'E = P × t (Energy = Power × time)' },
            { id: 'pw11', front: 'What is current?', back: 'Flow of electric charge, measured in Amps (A)' },
            { id: 'pw12', front: 'What is voltage?', back: 'Energy transferred per unit charge, measured in Volts (V)' },
            { id: 'pw13', front: 'What is resistance?', back: 'Opposition to current flow, measured in Ohms (Ω)' },
            { id: 'pw14', front: 'Series circuit current rule', back: 'Current is the same throughout' },
            { id: 'pw15', front: 'Parallel circuit voltage rule', back: 'Voltage is the same across each branch' }
        ]
    },

    // ENGLISH - Literary Devices
    {
        id: 'gcse-english-literary-devices',
        name: 'English - Literary Devices',
        subject: 'english',
        isPremade: true,
        cards: [
            { id: 'e1', front: 'What is a metaphor?', back: 'A direct comparison saying one thing IS another (e.g., "Life is a journey")' },
            { id: 'e2', front: 'What is a simile?', back: 'A comparison using "like" or "as" (e.g., "Fast as lightning")' },
            { id: 'e3', front: 'What is personification?', back: 'Giving human qualities to non-human things' },
            { id: 'e4', front: 'What is alliteration?', back: 'Repetition of consonant sounds at the start of words' },
            { id: 'e5', front: 'What is onomatopoeia?', back: 'Words that sound like what they describe (e.g., "buzz", "crash")' },
            { id: 'e6', front: 'What is pathetic fallacy?', back: 'Using weather/nature to reflect mood or emotion' },
            { id: 'e7', front: 'What is foreshadowing?', back: 'Hints or clues about what will happen later' },
            { id: 'e8', front: 'What is symbolism?', back: 'Using objects to represent deeper meanings or ideas' },
            { id: 'e9', front: 'What is irony?', back: 'When the opposite of what\'s expected happens or is said' },
            { id: 'e10', front: 'What is dramatic irony?', back: 'When the audience knows something characters don\'t' },
            { id: 'e11', front: 'What is hyperbole?', back: 'Extreme exaggeration for effect' },
            { id: 'e12', front: 'What is an oxymoron?', back: 'Two contradictory words together (e.g., "deafening silence")' },
            { id: 'e13', front: 'What is juxtaposition?', back: 'Placing contrasting ideas/images side by side' },
            { id: 'e14', front: 'What is emotive language?', back: 'Words chosen to provoke an emotional response' },
            { id: 'e15', front: 'What is a motif?', back: 'A recurring element that has symbolic significance' }
        ]
    },

    // ENGLISH - Shakespeare
    {
        id: 'gcse-english-shakespeare',
        name: 'English - Shakespeare Quotes',
        subject: 'english',
        isPremade: true,
        cards: [
            { id: 'sh1', front: '"Fair is foul, and foul is fair" - Play?', back: 'Macbeth (Witches) - Theme of appearance vs reality' },
            { id: 'sh2', front: '"Is this a dagger which I see before me?" - Meaning?', back: 'Macbeth\'s hallucination showing guilt and ambition before killing Duncan' },
            { id: 'sh3', front: '"Out, damned spot!" - Who says this?', back: 'Lady Macbeth - sleepwalking, guilt over Duncan\'s murder' },
            { id: 'sh4', front: '"But soft, what light through yonder window breaks?" - Context?', back: 'Romeo seeing Juliet on the balcony - Romeo and Juliet' },
            { id: 'sh5', front: '"A plague on both your houses!" - Who?', back: 'Mercutio (dying) - curses Montagues and Capulets' },
            { id: 'sh6', front: '"Parting is such sweet sorrow" - Device?', back: 'Oxymoron - Juliet expressing mixed feelings about leaving Romeo' },
            { id: 'sh7', front: '"If music be the food of love, play on" - Play?', back: 'Twelfth Night - Duke Orsino' },
            { id: 'sh8', front: '"To be, or not to be" - Theme?', back: 'Hamlet contemplating life and death/suicide' },
            { id: 'sh9', front: '"The quality of mercy is not strained" - Play?', back: 'The Merchant of Venice - Portia' },
            { id: 'sh10', front: '"All the world\'s a stage" - Meaning?', back: 'As You Like It - life compared to theatrical performance' },
            { id: 'sh11', front: '"Look like the innocent flower, but be the serpent under it" - Who?', back: 'Lady Macbeth advising Macbeth to hide his intentions' },
            { id: 'sh12', front: '"Double, double toil and trouble" - Context?', back: 'Witches\' spell in Macbeth - supernatural/evil' },
            { id: 'sh13', front: 'What is iambic pentameter?', back: '10 syllables per line, alternating unstressed/stressed (da-DUM)' },
            { id: 'sh14', front: 'What is a soliloquy?', back: 'Character speaking thoughts aloud, alone on stage' },
            { id: 'sh15', front: 'What is blank verse?', back: 'Unrhymed iambic pentameter' }
        ]
    },

    // HISTORY - World War 1
    {
        id: 'gcse-history-ww1',
        name: 'History - World War 1',
        subject: 'history',
        isPremade: true,
        cards: [
            { id: 'h1', front: 'When did WW1 start and end?', back: '1914 - 1918' },
            { id: 'h2', front: 'What event triggered WW1?', back: 'Assassination of Archduke Franz Ferdinand (28 June 1914)' },
            { id: 'h3', front: 'What are the MAIN causes of WW1?', back: 'Militarism, Alliances, Imperialism, Nationalism' },
            { id: 'h4', front: 'Triple Entente members', back: 'Britain, France, Russia' },
            { id: 'h5', front: 'Triple Alliance members', back: 'Germany, Austria-Hungary, Italy' },
            { id: 'h6', front: 'What was trench warfare?', back: 'Fighting from defensive trenches dug into the ground' },
            { id: 'h7', front: 'What was "No Man\'s Land"?', back: 'The dangerous area between opposing trenches' },
            { id: 'h8', front: 'Battle of the Somme date', back: '1 July - 18 November 1916' },
            { id: 'h9', front: 'British casualties on first day of the Somme', back: 'About 57,000 (19,240 dead)' },
            { id: 'h10', front: 'When did the USA enter WW1?', back: 'April 1917' },
            { id: 'h11', front: 'What was the Schlieffen Plan?', back: 'Germany\'s plan to defeat France quickly before fighting Russia' },
            { id: 'h12', front: 'What was the Treaty of Versailles?', back: 'Peace treaty that ended WW1, signed 28 June 1919' },
            { id: 'h13', front: 'Article 231 of Versailles Treaty', back: 'War Guilt Clause - blamed Germany for the war' },
            { id: 'h14', front: 'How much did Germany pay in reparations?', back: '£6.6 billion' },
            { id: 'h15', front: 'What was conscription?', back: 'Compulsory military service - introduced in Britain 1916' }
        ]
    },

    // HISTORY - World War 2
    {
        id: 'gcse-history-ww2',
        name: 'History - World War 2',
        subject: 'history',
        isPremade: true,
        cards: [
            { id: 'ww2_1', front: 'When did WW2 start and end?', back: '1939 - 1945' },
            { id: 'ww2_2', front: 'Why did Britain declare war on Germany?', back: 'Germany invaded Poland (1 September 1939)' },
            { id: 'ww2_3', front: 'What was the Blitz?', back: 'German bombing campaign on British cities (1940-41)' },
            { id: 'ww2_4', front: 'What was Dunkirk?', back: 'Evacuation of 338,000 Allied troops from France (May-June 1940)' },
            { id: 'ww2_5', front: 'When was the Battle of Britain?', back: 'July-October 1940 - air battle between RAF and Luftwaffe' },
            { id: 'ww2_6', front: 'What was D-Day?', back: '6 June 1944 - Allied invasion of Normandy, France' },
            { id: 'ww2_7', front: 'What was the Holocaust?', back: 'Nazi genocide killing 6 million Jews and millions of others' },
            { id: 'ww2_8', front: 'When did the USA join WW2?', back: 'December 1941 (after Pearl Harbor attack)' },
            { id: 'ww2_9', front: 'Who were the Axis powers?', back: 'Germany, Italy, Japan' },
            { id: 'ww2_10', front: 'Who were the Allied powers?', back: 'Britain, France, USSR, USA (and others)' },
            { id: 'ww2_11', front: 'What was Operation Barbarossa?', back: 'German invasion of the Soviet Union (June 1941)' },
            { id: 'ww2_12', front: 'What ended WW2 in Europe?', back: 'VE Day - 8 May 1945 (Germany surrendered)' },
            { id: 'ww2_13', front: 'What ended WW2 in the Pacific?', back: 'Atomic bombs on Hiroshima & Nagasaki (August 1945)' },
            { id: 'ww2_14', front: 'What was rationing?', back: 'Government control of food/goods distribution during war' },
            { id: 'ww2_15', front: 'What was evacuation?', back: 'Moving children from cities to countryside for safety' }
        ]
    },

    // GEOGRAPHY - Physical
    {
        id: 'gcse-geography-physical',
        name: 'Geography - Physical Geography',
        subject: 'geography',
        isPremade: true,
        cards: [
            { id: 'gp1', front: 'What is erosion?', back: 'The wearing away and removal of rock/soil by natural forces' },
            { id: 'gp2', front: 'Four types of erosion', back: 'Hydraulic action, Abrasion, Attrition, Solution' },
            { id: 'gp3', front: 'What is hydraulic action?', back: 'Force of water compressing air in rock cracks, breaking it apart' },
            { id: 'gp4', front: 'What is abrasion?', back: 'Rocks carried by water scraping against river bed/banks' },
            { id: 'gp5', front: 'What is deposition?', back: 'When rivers/seas drop sediment they were carrying' },
            { id: 'gp6', front: 'What is a meander?', back: 'A bend in a river caused by erosion and deposition' },
            { id: 'gp7', front: 'What is an oxbow lake?', back: 'A curved lake formed when a meander is cut off' },
            { id: 'gp8', front: 'What is a floodplain?', back: 'Flat area of land either side of a river that floods' },
            { id: 'gp9', front: 'What causes flooding?', back: 'Heavy rain, impermeable surfaces, steep slopes, saturated ground' },
            { id: 'gp10', front: 'Hard engineering flood defence example', back: 'Dams, flood walls, channel straightening' },
            { id: 'gp11', front: 'Soft engineering flood defence example', back: 'Flood warnings, planting trees, floodplain zoning' },
            { id: 'gp12', front: 'What is a stack (coast)?', back: 'A column of rock left standing after an arch collapses' },
            { id: 'gp13', front: 'What is longshore drift?', back: 'Movement of sediment along coast by waves at an angle' },
            { id: 'gp14', front: 'What is a spit?', back: 'A finger of land extending into the sea from the coast' },
            { id: 'gp15', front: 'What causes earthquakes?', back: 'Movement of tectonic plates at plate boundaries' }
        ]
    },

    // GEOGRAPHY - Human
    {
        id: 'gcse-geography-human',
        name: 'Geography - Human Geography',
        subject: 'geography',
        isPremade: true,
        cards: [
            { id: 'gh1', front: 'What is urbanisation?', back: 'The growth of towns and cities as people move from rural areas' },
            { id: 'gh2', front: 'Push factors for migration', back: 'War, poverty, natural disasters, lack of jobs' },
            { id: 'gh3', front: 'Pull factors for migration', back: 'Better jobs, education, healthcare, safety, family' },
            { id: 'gh4', front: 'What is a megacity?', back: 'A city with population over 10 million' },
            { id: 'gh5', front: 'What is urban sprawl?', back: 'Uncontrolled expansion of urban areas into countryside' },
            { id: 'gh6', front: 'What is the CBD?', back: 'Central Business District - main shopping and office area' },
            { id: 'gh7', front: 'What is gentrification?', back: 'Renovation of poor urban areas by wealthier newcomers' },
            { id: 'gh8', front: 'What is sustainable development?', back: 'Development meeting present needs without compromising future generations' },
            { id: 'gh9', front: 'What is a renewable energy?', back: 'Energy from sources that won\'t run out (solar, wind, hydro)' },
            { id: 'gh10', front: 'What is a carbon footprint?', back: 'Total greenhouse gases produced by an activity/person' },
            { id: 'gh11', front: 'HIC stands for?', back: 'High Income Country (e.g., UK, USA, Japan)' },
            { id: 'gh12', front: 'LIC stands for?', back: 'Low Income Country (e.g., many African nations)' },
            { id: 'gh13', front: 'NEE stands for?', back: 'Newly Emerging Economy (e.g., China, Brazil, India)' },
            { id: 'gh14', front: 'What is fair trade?', back: 'Trade ensuring producers get fair prices and conditions' },
            { id: 'gh15', front: 'What is globalisation?', back: 'Increasing connections between countries through trade, culture, technology' }
        ]
    },

    // FRENCH - Common Phrases
    {
        id: 'gcse-french-phrases',
        name: 'French - Essential Phrases',
        subject: 'languages',
        isPremade: true,
        cards: [
            { id: 'fr1', front: 'Hello / Hi', back: 'Bonjour / Salut' },
            { id: 'fr2', front: 'How are you? (formal)', back: 'Comment allez-vous?' },
            { id: 'fr3', front: 'How are you? (informal)', back: 'Ça va? / Comment vas-tu?' },
            { id: 'fr4', front: 'I\'m fine, thanks', back: 'Je vais bien, merci / Ça va bien' },
            { id: 'fr5', front: 'My name is...', back: 'Je m\'appelle...' },
            { id: 'fr6', front: 'I am ... years old', back: 'J\'ai ... ans' },
            { id: 'fr7', front: 'I live in...', back: 'J\'habite à...' },
            { id: 'fr8', front: 'I like...', back: 'J\'aime...' },
            { id: 'fr9', front: 'I don\'t like...', back: 'Je n\'aime pas...' },
            { id: 'fr10', front: 'I would like...', back: 'Je voudrais...' },
            { id: 'fr11', front: 'Where is...?', back: 'Où est...?' },
            { id: 'fr12', front: 'What time is it?', back: 'Quelle heure est-il?' },
            { id: 'fr13', front: 'I don\'t understand', back: 'Je ne comprends pas' },
            { id: 'fr14', front: 'Can you repeat please?', back: 'Pouvez-vous répéter, s\'il vous plaît?' },
            { id: 'fr15', front: 'Goodbye', back: 'Au revoir' },
            { id: 'fr16', front: 'Please', back: 'S\'il vous plaît / S\'il te plaît' },
            { id: 'fr17', front: 'Thank you', back: 'Merci' },
            { id: 'fr18', front: 'Sorry / Excuse me', back: 'Pardon / Excusez-moi' },
            { id: 'fr19', front: 'In my opinion...', back: 'À mon avis...' },
            { id: 'fr20', front: 'Because...', back: 'Parce que... / Car...' }
        ]
    },

    // FRENCH - Vocabulary
    {
        id: 'gcse-french-vocab',
        name: 'French - Key Vocabulary',
        subject: 'languages',
        isPremade: true,
        cards: [
            { id: 'fv1', front: 'The house', back: 'La maison' },
            { id: 'fv2', front: 'The school', back: 'L\'école (f)' },
            { id: 'fv3', front: 'The family', back: 'La famille' },
            { id: 'fv4', front: 'The friend (m/f)', back: 'L\'ami / L\'amie' },
            { id: 'fv5', front: 'The town', back: 'La ville' },
            { id: 'fv6', front: 'The country', back: 'Le pays / La campagne' },
            { id: 'fv7', front: 'The food', back: 'La nourriture' },
            { id: 'fv8', front: 'The work', back: 'Le travail' },
            { id: 'fv9', front: 'The holiday', back: 'Les vacances (f)' },
            { id: 'fv10', front: 'Today', back: 'Aujourd\'hui' },
            { id: 'fv11', front: 'Tomorrow', back: 'Demain' },
            { id: 'fv12', front: 'Yesterday', back: 'Hier' },
            { id: 'fv13', front: 'Always', back: 'Toujours' },
            { id: 'fv14', front: 'Sometimes', back: 'Quelquefois / Parfois' },
            { id: 'fv15', front: 'Never', back: 'Jamais (ne...jamais)' },
            { id: 'fv16', front: 'Very', back: 'Très' },
            { id: 'fv17', front: 'Too (much)', back: 'Trop' },
            { id: 'fv18', front: 'A lot', back: 'Beaucoup' },
            { id: 'fv19', front: 'However', back: 'Cependant / Pourtant' },
            { id: 'fv20', front: 'Therefore', back: 'Donc' }
        ]
    },

    // SPANISH - Common Phrases
    {
        id: 'gcse-spanish-phrases',
        name: 'Spanish - Essential Phrases',
        subject: 'languages',
        isPremade: true,
        cards: [
            { id: 'sp1', front: 'Hello', back: 'Hola' },
            { id: 'sp2', front: 'How are you?', back: '¿Cómo estás? / ¿Qué tal?' },
            { id: 'sp3', front: 'I\'m fine, thanks', back: 'Estoy bien, gracias' },
            { id: 'sp4', front: 'My name is...', back: 'Me llamo...' },
            { id: 'sp5', front: 'I am ... years old', back: 'Tengo ... años' },
            { id: 'sp6', front: 'I live in...', back: 'Vivo en...' },
            { id: 'sp7', front: 'I like...', back: 'Me gusta... / Me gustan...' },
            { id: 'sp8', front: 'I don\'t like...', back: 'No me gusta...' },
            { id: 'sp9', front: 'I would like...', back: 'Me gustaría... / Quisiera...' },
            { id: 'sp10', front: 'Where is...?', back: '¿Dónde está...?' },
            { id: 'sp11', front: 'What time is it?', back: '¿Qué hora es?' },
            { id: 'sp12', front: 'I don\'t understand', back: 'No entiendo / No comprendo' },
            { id: 'sp13', front: 'Can you repeat please?', back: '¿Puede repetir, por favor?' },
            { id: 'sp14', front: 'Goodbye', back: 'Adiós / Hasta luego' },
            { id: 'sp15', front: 'Please', back: 'Por favor' },
            { id: 'sp16', front: 'Thank you', back: 'Gracias' },
            { id: 'sp17', front: 'Sorry', back: 'Lo siento / Perdón' },
            { id: 'sp18', front: 'In my opinion...', back: 'En mi opinión... / Creo que...' },
            { id: 'sp19', front: 'Because...', back: 'Porque...' },
            { id: 'sp20', front: 'Good morning/afternoon/night', back: 'Buenos días / Buenas tardes / Buenas noches' }
        ]
    },

    // COMPUTER SCIENCE
    {
        id: 'gcse-compsci-basics',
        name: 'Computer Science - Key Concepts',
        subject: 'other',
        isPremade: true,
        cards: [
            { id: 'cs1', front: 'What is an algorithm?', back: 'A step-by-step set of instructions to solve a problem' },
            { id: 'cs2', front: 'What is binary?', back: 'Base-2 number system using only 0 and 1' },
            { id: 'cs3', front: 'Convert 5 to binary', back: '101' },
            { id: 'cs4', front: 'Convert 1010 binary to decimal', back: '10' },
            { id: 'cs5', front: 'What is hexadecimal?', back: 'Base-16 number system (0-9 and A-F)' },
            { id: 'cs6', front: 'What is the CPU?', back: 'Central Processing Unit - the brain of the computer' },
            { id: 'cs7', front: 'What does RAM stand for?', back: 'Random Access Memory - temporary, volatile storage' },
            { id: 'cs8', front: 'What does ROM stand for?', back: 'Read Only Memory - permanent, non-volatile storage' },
            { id: 'cs9', front: 'What is a variable?', back: 'A named storage location that holds a value' },
            { id: 'cs10', front: 'What is a loop?', back: 'Code that repeats until a condition is met' },
            { id: 'cs11', front: 'What is an IF statement?', back: 'A selection that runs code only if condition is true' },
            { id: 'cs12', front: 'What is a function/procedure?', back: 'A reusable block of code that performs a task' },
            { id: 'cs13', front: 'What is debugging?', back: 'Finding and fixing errors in code' },
            { id: 'cs14', front: 'What is malware?', back: 'Malicious software designed to damage or exploit systems' },
            { id: 'cs15', front: 'What is phishing?', back: 'Fraudulent attempt to obtain sensitive data via fake communications' },
            { id: 'cs16', front: 'What is encryption?', back: 'Converting data into code to prevent unauthorized access' },
            { id: 'cs17', front: 'What is SQL?', back: 'Structured Query Language - used to manage databases' },
            { id: 'cs18', front: 'What is HTML?', back: 'HyperText Markup Language - structures web pages' },
            { id: 'cs19', front: 'What is Boolean?', back: 'Data type with only two values: True or False' },
            { id: 'cs20', front: 'What is an array?', back: 'A data structure storing multiple values of same type' }
        ]
    },

    // RELIGIOUS STUDIES
    {
        id: 'gcse-rs-beliefs',
        name: 'Religious Studies - Key Beliefs',
        subject: 'other',
        isPremade: true,
        cards: [
            { id: 'rs1', front: 'Christian belief about God', back: 'One God in three persons: Father, Son, Holy Spirit (Trinity)' },
            { id: 'rs2', front: 'What is the Incarnation?', back: 'God becoming human in the person of Jesus' },
            { id: 'rs3', front: 'What is Salvation?', back: 'Being saved from sin and its consequences' },
            { id: 'rs4', front: 'What is the Resurrection?', back: 'Jesus rising from the dead three days after crucifixion' },
            { id: 'rs5', front: 'Islamic belief about God', back: 'Tawhid - there is only one God (Allah), no partners' },
            { id: 'rs6', front: 'Five Pillars of Islam', back: 'Shahadah, Salah, Zakah, Sawm, Hajj' },
            { id: 'rs7', front: 'What is Shahadah?', back: 'Declaration of faith - no god but Allah, Muhammad is messenger' },
            { id: 'rs8', front: 'What is Salah?', back: 'Prayer five times a day facing Makkah' },
            { id: 'rs9', front: 'What is Zakah?', back: 'Giving 2.5% of wealth to charity' },
            { id: 'rs10', front: 'What is the Sanctity of Life?', back: 'Belief that all life is holy/sacred and belongs to God' },
            { id: 'rs11', front: 'Christian view on abortion', back: 'Generally opposed - life begins at conception, but some allow exceptions' },
            { id: 'rs12', front: 'What is euthanasia?', back: 'Deliberately ending life to relieve suffering' },
            { id: 'rs13', front: 'What is Stewardship?', back: 'Responsibility to look after God\'s creation (environment)' },
            { id: 'rs14', front: 'Just War criteria', back: 'Last resort, just cause, declared by authority, proportional' },
            { id: 'rs15', front: 'Golden Rule (Christianity)', back: 'Treat others as you want to be treated' }
        ]
    },

    // BUSINESS STUDIES
    {
        id: 'gcse-business',
        name: 'Business Studies - Key Terms',
        subject: 'other',
        isPremade: true,
        cards: [
            { id: 'bus1', front: 'What is an entrepreneur?', back: 'Someone who takes risks to start and run a business' },
            { id: 'bus2', front: 'What is revenue?', back: 'Total income from sales (price × quantity sold)' },
            { id: 'bus3', front: 'What is profit?', back: 'Revenue minus costs' },
            { id: 'bus4', front: 'Fixed costs examples', back: 'Rent, salaries, insurance - don\'t change with output' },
            { id: 'bus5', front: 'Variable costs examples', back: 'Raw materials, packaging - change with output' },
            { id: 'bus6', front: 'What is break-even?', back: 'Point where total revenue equals total costs (no profit/loss)' },
            { id: 'bus7', front: 'What is cash flow?', back: 'Movement of money in and out of a business' },
            { id: 'bus8', front: 'What is market research?', back: 'Gathering information about customers and competitors' },
            { id: 'bus9', front: 'Primary research examples', back: 'Surveys, interviews, focus groups - new data collected' },
            { id: 'bus10', front: 'Secondary research examples', back: 'Internet, reports, newspapers - existing data used' },
            { id: 'bus11', front: 'The 4 Ps of Marketing', back: 'Product, Price, Place, Promotion' },
            { id: 'bus12', front: 'What is a stakeholder?', back: 'Anyone with an interest in the business (employees, customers, shareholders)' },
            { id: 'bus13', front: 'What is a sole trader?', back: 'Business owned by one person with unlimited liability' },
            { id: 'bus14', front: 'What is a Ltd company?', back: 'Private limited company - shareholders with limited liability' },
            { id: 'bus15', front: 'What is market share?', back: 'Percentage of total market sales held by a business' }
        ]
    }
];

// Function to initialize GCSE decks
function initializeGCSEDecks() {
    const decks = Storage.getDecks();

    GCSEDecks.forEach(gcseDeck => {
        // Check if this GCSE deck already exists
        const exists = decks.some(d => d.id === gcseDeck.id);

        if (!exists) {
            // Add spaced repetition data to each card
            const deckWithSR = {
                ...gcseDeck,
                cards: gcseDeck.cards.map(card => ({
                    ...card,
                    easeFactor: 2.5,
                    interval: 0,
                    repetitions: 0,
                    nextReview: null,
                    lastReview: null
                })),
                createdAt: new Date().toISOString()
            };

            decks.push(deckWithSR);
        }
    });

    Storage.saveDecks(decks);
}
