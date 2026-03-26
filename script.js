/* ═══════════════════════════════════════════════════════════
   EduLocator  ·  script.js
   National Center for Education Statistics — Global Locator
   Handcrafted, official-feel, interaction-rich
═══════════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────────────
   DATA  ·  50 States + DC + Territories
────────────────────────────────────────────────────────── */
const STATES = [
  ['AL','Alabama'],['AK','Alaska'],['AZ','Arizona'],['AR','Arkansas'],
  ['CA','California'],['CO','Colorado'],['CT','Connecticut'],['DE','Delaware'],
  ['DC','District of Columbia'],['FL','Florida'],['GA','Georgia'],['HI','Hawaii'],
  ['ID','Idaho'],['IL','Illinois'],['IN','Indiana'],['IA','Iowa'],
  ['KS','Kansas'],['KY','Kentucky'],['LA','Louisiana'],['ME','Maine'],
  ['MD','Maryland'],['MA','Massachusetts'],['MI','Michigan'],['MN','Minnesota'],
  ['MS','Mississippi'],['MO','Missouri'],['MT','Montana'],['NE','Nebraska'],
  ['NV','Nevada'],['NH','New Hampshire'],['NJ','New Jersey'],['NM','New Mexico'],
  ['NY','New York'],['NC','North Carolina'],['ND','North Dakota'],['OH','Ohio'],
  ['OK','Oklahoma'],['OR','Oregon'],['PA','Pennsylvania'],['RI','Rhode Island'],
  ['SC','South Carolina'],['SD','South Dakota'],['TN','Tennessee'],['TX','Texas'],
  ['UT','Utah'],['VT','Vermont'],['VA','Virginia'],['WA','Washington'],
  ['WV','West Virginia'],['WI','Wisconsin'],['WY','Wyoming'],
  ['AS','American Samoa'],['GU','Guam'],['MP','Northern Mariana Is.'],
  ['PR','Puerto Rico'],['VI','Virgin Islands']
];

/* State cartogram grid positions [row, col] — 12-column grid */
const STATE_GRID = {
  ME:[0,11], NH:[1,10], VT:[1,9],
  WA:[1,0],  MT:[1,1],  ND:[1,2],  MN:[1,3],  WI:[1,5],  MI:[1,6],
  OR:[2,0],  ID:[2,1],  SD:[2,2],  IA:[2,3],  IL:[2,4],  IN:[2,5],  OH:[2,6],  PA:[2,7],  NY:[2,8],  MA:[2,9],  CT:[2,10], RI:[2,11],
  CA:[3,0],  NV:[3,1],  WY:[3,2],  NE:[3,3],  MO:[3,4],  KY:[3,5],  WV:[3,6],  VA:[3,7],  MD:[3,8],  DE:[3,9],  NJ:[3,10], DC:[3,11],
  UT:[4,1],  CO:[4,2],  KS:[4,3],  TN:[4,4],  NC:[4,5],  SC:[4,6],
  AZ:[5,1],  NM:[5,2],  OK:[5,3],  AR:[5,4],  MS:[5,5],  AL:[5,6],  GA:[5,7],
  TX:[6,3],  LA:[6,5],  FL:[6,7],
  AK:[7,0],  HI:[7,1]
};

/* Institution data — representative sample */
const INSTITUTIONS = [
  /* ── Colleges / Universities ── */
  { id:1,  name:'Massachusetts Institute of Technology', type:'college', city:'Cambridge', state:'MA', zip:'02139', phone:'(617) 253-1000', web:'http://web.mit.edu', grades:'9-12,College', enroll:11520, locale:'Urban', est:1861, desc:'World-renowned research university in science, engineering, and technology.', students:11520, faculty:1066, ratio:'11:1' },
  { id:2,  name:'Stanford University', type:'college', city:'Stanford', state:'CA', zip:'94305', phone:'(650) 723-2300', web:'https://www.stanford.edu', grades:'College', enroll:17249, locale:'Suburban', est:1885, desc:'Private research university known for entrepreneurship and innovation in Silicon Valley.', students:17249, faculty:2194, ratio:'5:1' },
  { id:3,  name:'Harvard University', type:'college', city:'Cambridge', state:'MA', zip:'02138', phone:'(617) 495-1000', web:'https://www.harvard.edu', grades:'College', enroll:23731, locale:'Urban', est:1636, desc:'Oldest university in the US and a member of the Ivy League.', students:23731, faculty:2400, ratio:'7:1' },
  { id:4,  name:'University of Chicago', type:'college', city:'Chicago', state:'IL', zip:'60637', phone:'(773) 702-1234', web:'https://www.uchicago.edu', grades:'College', enroll:16445, locale:'Urban', est:1890, desc:'Private research university with strength in economics and social sciences.', students:16445, faculty:2311, ratio:'6:1' },
  { id:5,  name:'Yale University', type:'college', city:'New Haven', state:'CT', zip:'06520', phone:'(203) 432-4771', web:'https://www.yale.edu', grades:'College', enroll:14056, locale:'Urban', est:1701, desc:'Ivy League university with a distinguished liberal arts tradition.', students:14056, faculty:4074, ratio:'6:1' },
  { id:6,  name:'Princeton University', type:'college', city:'Princeton', state:'NJ', zip:'08544', phone:'(609) 258-3000', web:'https://www.princeton.edu', grades:'College', enroll:8478, locale:'Suburban', est:1746, desc:'One of the oldest universities in the US, an Ivy League member.', students:8478, faculty:1308, ratio:'5:1' },
  { id:7,  name:'Columbia University', type:'college', city:'New York', state:'NY', zip:'10027', phone:'(212) 854-1754', web:'https://www.columbia.edu', grades:'College', enroll:34141, locale:'Urban', est:1754, desc:'Ivy League university in New York City with globally recognised programmes.', students:34141, faculty:7791, ratio:'6:1' },
  { id:8,  name:'Duke University', type:'college', city:'Durham', state:'NC', zip:'27708', phone:'(919) 684-8111', web:'https://www.duke.edu', grades:'College', enroll:16606, locale:'Suburban', est:1838, desc:'Private research university offering strong programmes in medicine, law, and public policy.', students:16606, faculty:3853, ratio:'7:1' },
  { id:9,  name:'University of Michigan', type:'college', city:'Ann Arbor', state:'MI', zip:'48109', phone:'(734) 764-1817', web:'https://umich.edu', grades:'College', enroll:47907, locale:'Suburban', est:1817, desc:'Top public research university known for engineering and business.', students:47907, faculty:6882, ratio:'15:1' },
  { id:10, name:'UCLA', type:'college', city:'Los Angeles', state:'CA', zip:'90095', phone:'(310) 825-4321', web:'https://www.ucla.edu', grades:'College', enroll:46116, locale:'Urban', est:1919, desc:'Major research university of the University of California system.', students:46116, faculty:4971, ratio:'18:1' },
  { id:11, name:'University of Texas at Austin', type:'college', city:'Austin', state:'TX', zip:'78712', phone:'(512) 471-3434', web:'https://www.utexas.edu', grades:'College', enroll:50476, locale:'Urban', est:1883, desc:'Flagship university of the University of Texas System.', students:50476, faculty:3126, ratio:'19:1' },
  { id:12, name:'Georgia Institute of Technology', type:'college', city:'Atlanta', state:'GA', zip:'30332', phone:'(404) 894-2000', web:'https://www.gatech.edu', grades:'College', enroll:21769, locale:'Urban', est:1885, desc:'Leading technical university with notable engineering and computing programmes.', students:21769, faculty:1140, ratio:'21:1' },
  { id:13, name:'University of Washington', type:'college', city:'Seattle', state:'WA', zip:'98195', phone:'(206) 543-2100', web:'https://www.washington.edu', grades:'College', enroll:47400, locale:'Urban', est:1861, desc:'Major public research university on the US Pacific Northwest coast.', students:47400, faculty:5074, ratio:'21:1' },
  { id:14, name:'Carnegie Mellon University', type:'college', city:'Pittsburgh', state:'PA', zip:'15213', phone:'(412) 268-2000', web:'https://www.cmu.edu', grades:'College', enroll:14799, locale:'Urban', est:1900, desc:'Private research university excelling in computer science and the arts.', students:14799, faculty:1424, ratio:'9:1' },
  { id:15, name:'New York University', type:'college', city:'New York', state:'NY', zip:'10012', phone:'(212) 998-1212', web:'https://www.nyu.edu', grades:'College', enroll:59144, locale:'Urban', est:1831, desc:'Global research university with campuses across the world.', students:59144, faculty:7271, ratio:'10:1' },
  { id:16, name:'University of Pennsylvania', type:'college', city:'Philadelphia', state:'PA', zip:'19104', phone:'(215) 898-5000', web:'https://www.upenn.edu', grades:'College', enroll:22020, locale:'Urban', est:1740, desc:'Ivy League research university known for Wharton School of Business.', students:22020, faculty:4464, ratio:'6:1' },
  { id:17, name:'Johns Hopkins University', type:'college', city:'Baltimore', state:'MD', zip:'21218', phone:'(410) 516-8000', web:'https://www.jhu.edu', grades:'College', enroll:28014, locale:'Urban', est:1876, desc:'America\'s first research university with world-class medical school.', students:28014, faculty:5143, ratio:'7:1' },
  { id:18, name:'Northwestern University', type:'college', city:'Evanston', state:'IL', zip:'60208', phone:'(847) 491-3741', web:'https://www.northwestern.edu', grades:'College', enroll:21946, locale:'Suburban', est:1851, desc:'Private research university near Chicago with a strong journalism and law programme.', students:21946, faculty:3416, ratio:'7:1' },
  { id:19, name:'Cornell University', type:'college', city:'Ithaca', state:'NY', zip:'14853', phone:'(607) 254-4636', web:'https://www.cornell.edu', grades:'College', enroll:24734, locale:'Rural', est:1865, desc:'Ivy League research university in the Finger Lakes region of New York.', students:24734, faculty:2786, ratio:'9:1' },
  { id:20, name:'Dartmouth College', type:'college', city:'Hanover', state:'NH', zip:'03755', phone:'(603) 646-1110', web:'https://home.dartmouth.edu', grades:'College', enroll:7834, locale:'Rural', est:1769, desc:'Liberal arts-focused Ivy League college in northern New England.', students:7834, faculty:1161, ratio:'7:1' },
  { id:21, name:'Brown University', type:'college', city:'Providence', state:'RI', zip:'02912', phone:'(401) 863-1000', web:'https://www.brown.edu', grades:'College', enroll:10696, locale:'Urban', est:1764, desc:'Ivy League university with an open curriculum model.', students:10696, faculty:1162, ratio:'7:1' },
  { id:22, name:'University of Notre Dame', type:'college', city:'Notre Dame', state:'IN', zip:'46556', phone:'(574) 631-5000', web:'https://www.nd.edu', grades:'College', enroll:12681, locale:'Suburban', est:1842, desc:'Catholic research university recognised for law, business, and theology.', students:12681, faculty:1590, ratio:'10:1' },
  { id:23, name:'Vanderbilt University', type:'college', city:'Nashville', state:'TN', zip:'37240', phone:'(615) 322-7311', web:'https://www.vanderbilt.edu', grades:'College', enroll:13537, locale:'Urban', est:1873, desc:'Private research university with strong programmes in education and health.', students:13537, faculty:4132, ratio:'8:1' },
  { id:24, name:'Rice University', type:'college', city:'Houston', state:'TX', zip:'77005', phone:'(713) 348-0000', web:'https://www.rice.edu', grades:'College', enroll:7699, locale:'Urban', est:1912, desc:'Private research university with a strong STEM focus in Houston.', students:7699, faculty:1037, ratio:'6:1' },
  { id:25, name:'Emory University', type:'college', city:'Atlanta', state:'GA', zip:'30322', phone:'(404) 727-6123', web:'https://www.emory.edu', grades:'College', enroll:15459, locale:'Suburban', est:1836, desc:'Private research university affiliated with the United Methodist Church.', students:15459, faculty:3800, ratio:'8:1' },
  { id:26, name:'Georgetown University', type:'college', city:'Washington', state:'DC', zip:'20057', phone:'(202) 687-0100', web:'https://www.georgetown.edu', grades:'College', enroll:19541, locale:'Urban', est:1789, desc:'Oldest Jesuit university in the US, renowned for international relations.', students:19541, faculty:2368, ratio:'11:1' },
  { id:27, name:'University of Virginia', type:'college', city:'Charlottesville', state:'VA', zip:'22903', phone:'(434) 924-0311', web:'https://www.virginia.edu', grades:'College', enroll:25916, locale:'Suburban', est:1819, desc:'Thomas Jefferson\'s university; an "Academical Village" in the Blue Ridge foothills.', students:25916, faculty:3210, ratio:'15:1' },
  { id:28, name:'Ohio State University', type:'college', city:'Columbus', state:'OH', zip:'43210', phone:'(614) 292-6446', web:'https://www.osu.edu', grades:'College', enroll:60479, locale:'Urban', est:1870, desc:'One of the largest US universities, notable for research and athletics.', students:60479, faculty:7236, ratio:'19:1' },
  { id:29, name:'Penn State University', type:'college', city:'State College', state:'PA', zip:'16802', phone:'(814) 865-4700', web:'https://www.psu.edu', grades:'College', enroll:46614, locale:'Rural', est:1855, desc:'Land-grant research university with campuses across Pennsylvania.', students:46614, faculty:6200, ratio:'18:1' },
  { id:30, name:'University of Florida', type:'college', city:'Gainesville', state:'FL', zip:'32611', phone:'(352) 392-3261', web:'https://www.ufl.edu', grades:'College', enroll:56565, locale:'Suburban', est:1853, desc:'Flagship land-grant university of Florida, highly ranked in public university rankings.', students:56565, faculty:5450, ratio:'17:1' },

  /* ── Public K-12 Schools ── */
  { id:31, name:'Thomas Jefferson High School for Science & Technology', type:'public', city:'Alexandria', state:'VA', zip:'22312', phone:'(703) 750-8300', web:'https://tjhsst.fcps.edu', grades:'9-12', enroll:1900, locale:'Suburban', est:1985, desc:'Nationally ranked magnet high school for science, technology, and mathematics.', students:1900, faculty:140, ratio:'14:1' },
  { id:32, name:'Boston Latin School', type:'public', city:'Boston', state:'MA', zip:'02120', phone:'(617) 635-8895', web:'https://bls.org', grades:'7-12', enroll:2413, locale:'Urban', est:1635, desc:'Oldest public school in the United States.', students:2413, faculty:164, ratio:'15:1' },
  { id:33, name:'Stuyvesant High School', type:'public', city:'New York', state:'NY', zip:'10282', phone:'(212) 312-4800', web:'http://stuy.enschool.org', grades:'9-12', enroll:3295, locale:'Urban', est:1904, desc:'Selective public specialised high school in Lower Manhattan.', students:3295, faculty:185, ratio:'18:1' },
  { id:34, name:'Bronx High School of Science', type:'public', city:'Bronx', state:'NY', zip:'10468', phone:'(718) 817-7700', web:'https://www.bxscience.edu', grades:'9-12', enroll:3140, locale:'Urban', est:1938, desc:'Specialised public high school producing numerous Nobel laureates.', students:3140, faculty:170, ratio:'18:1' },
  { id:35, name:'North Carolina School of Science & Mathematics', type:'public', city:'Durham', state:'NC', zip:'27705', phone:'(919) 416-2700', web:'https://www.ncssm.edu', grades:'11-12', enroll:680, locale:'Urban', est:1980, desc:'State-funded residential school for gifted students in STEM.', students:680, faculty:60, ratio:'11:1' },
  { id:36, name:'Whitney Young Magnet High School', type:'public', city:'Chicago', state:'IL', zip:'60607', phone:'(773) 534-7500', web:'https://www.wyoung.org', grades:'9-12', enroll:2240, locale:'Urban', est:1975, desc:'Selective magnet school and perennial top-ranked high school in Illinois.', students:2240, faculty:148, ratio:'15:1' },
  { id:37, name:'Central High School Philadelphia', type:'public', city:'Philadelphia', state:'PA', zip:'19138', phone:'(215) 276-5262', web:'https://centralhighschool.net', grades:'9-12', enroll:2200, locale:'Urban', est:1836, desc:'Oldest high school in Philadelphia with a college-preparatory curriculum.', students:2200, faculty:150, ratio:'15:1' },
  { id:38, name:'Walter Payton College Preparatory', type:'public', city:'Chicago', state:'IL', zip:'60647', phone:'(773) 534-0034', web:'https://www.walterpayton.org', grades:'9-12', enroll:996, locale:'Urban', est:2000, desc:'Selective-enrollment high school in Chicago, consistently ranked among the best in the US.', students:996, faculty:75, ratio:'13:1' },
  { id:39, name:'School for Advanced Studies Miami', type:'public', city:'Miami', state:'FL', zip:'33176', phone:'(305) 237-2890', web:'https://www.sas.mdc.edu', grades:'11-12', enroll:450, locale:'Suburban', est:1990, desc:'Dual-enrollment school where students earn associate and high school diplomas simultaneously.', students:450, faculty:30, ratio:'15:1' },
  { id:40, name:'Bergen County Academies', type:'public', city:'Hackensack', state:'NJ', zip:'07601', phone:'(201) 343-6000', web:'https://academies.bergen.org', grades:'9-12', enroll:835, locale:'Suburban', est:1988, desc:'Acclaimed magnet school offering specialised programmes in health sciences and engineering.', students:835, faculty:80, ratio:'10:1' },
  { id:41, name:'Mississippi School for Math & Science', type:'public', city:'Columbus', state:'MS', zip:'39701', phone:'(662) 329-7000', web:'https://www.msms.edu.ms', grades:'11-12', enroll:265, locale:'Rural', est:1987, desc:'Residential magnet school for academically gifted Mississippi students.', students:265, faculty:35, ratio:'8:1' },
  { id:42, name:'New Trier Township High School', type:'public', city:'Winnetka', state:'IL', zip:'60093', phone:'(847) 446-7000', web:'https://www.newtrier.k12.il.us', grades:'9-12', enroll:4073, locale:'Suburban', est:1901, desc:'One of the most highly rated public high schools in the United States.', students:4073, faculty:340, ratio:'12:1' },
  { id:43, name:'Lakeside School', type:'public', city:'Seattle', state:'WA', zip:'98125', phone:'(206) 368-3600', web:'https://www.lakesideschool.org', grades:'K-12', enroll:850, locale:'Urban', est:1919, desc:'Independent school in Seattle with outstanding academic reputation.', students:850, faculty:110, ratio:'8:1' },
  { id:44, name:'Palo Alto High School', type:'public', city:'Palo Alto', state:'CA', zip:'94301', phone:'(650) 329-3701', web:'https://www.paloaltolearns.net', grades:'9-12', enroll:1946, locale:'Suburban', est:1898, desc:'High school in Silicon Valley known for its journalism program and alumni network.', students:1946, faculty:140, ratio:'14:1' },
  { id:45, name:'Westview High School', type:'public', city:'Portland', state:'OR', zip:'97229', phone:'(503) 356-2900', web:'https://westview.beaverton.k12.or.us', grades:'9-12', enroll:2150, locale:'Suburban', est:1994, desc:'Comprehensive public high school in the Beaverton School District.', students:2150, faculty:140, ratio:'15:1' },
  { id:46, name:'Henry M. Gunn High School', type:'public', city:'Palo Alto', state:'CA', zip:'94306', phone:'(650) 354-8200', web:'https://gunn.pausd.org', grades:'9-12', enroll:2074, locale:'Suburban', est:1964, desc:'Comprehensive high school in Palo Alto known for academic excellence.', students:2074, faculty:148, ratio:'14:1' },
  { id:47, name:'Garfield High School', type:'public', city:'Seattle', state:'WA', zip:'98122', phone:'(206) 252-2270', web:'https://garfield.seattleschools.org', grades:'9-12', enroll:1765, locale:'Urban', est:1923, desc:'Urban comprehensive high school with strong music and arts programmes.', students:1765, faculty:116, ratio:'15:1' },
  { id:48, name:'Cherry Creek High School', type:'public', city:'Greenwood Village', state:'CO', zip:'80111', phone:'(720) 554-2000', web:'https://www.ccsdschools.com/cherrycreek', grades:'9-12', enroll:3900, locale:'Suburban', est:1955, desc:'One of Colorado\'s largest and most academically recognised public high schools.', students:3900, faculty:260, ratio:'15:1' },
  { id:49, name:'Naperville Central High School', type:'public', city:'Naperville', state:'IL', zip:'60540', phone:'(630) 420-6400', web:'https://nhs.naperville203.org', grades:'9-12', enroll:2818, locale:'Suburban', est:1965, desc:'Award-winning public high school consistently ranked among Illinois\' best.', students:2818, faculty:190, ratio:'15:1' },
  { id:50, name:'Poolesville High School', type:'public', city:'Poolesville', state:'MD', zip:'20837', phone:'(301) 972-7811', web:'https://www.montgomeryschoolsmd.org/schools/poolesvillehs', grades:'9-12', enroll:1200, locale:'Rural', est:1967, desc:'Home to the nationally recognised Global Ecology and Science/Math/Computer Science programmes.', students:1200, faculty:95, ratio:'13:1' },

  /* ── Private Schools ── */
  { id:51, name:'Phillips Academy Andover', type:'private', city:'Andover', state:'MA', zip:'01810', phone:'(978) 749-4000', web:'https://www.andover.edu', grades:'9-12', enroll:1125, locale:'Suburban', est:1778, desc:'One of the oldest and most prestigious boarding schools in the US.', students:1125, faculty:207, ratio:'5:1' },
  { id:52, name:'Exeter Academy', type:'private', city:'Exeter', state:'NH', zip:'03833', phone:'(603) 772-4311', web:'https://www.exeter.edu', grades:'9-12', enroll:1082, locale:'Suburban', est:1781, desc:'Elite boarding school using the Harkness method of discussion-based learning.', students:1082, faculty:226, ratio:'5:1' },
  { id:53, name:'Hotchkiss School', type:'private', city:'Lakeville', state:'CT', zip:'06039', phone:'(860) 435-2591', web:'https://www.hotchkiss.org', grades:'9-12', enroll:600, locale:'Rural', est:1891, desc:'Prestigious boarding school in the Berkshire hills of Connecticut.', students:600, faculty:130, ratio:'5:1' },
  { id:54, name:'Choate Rosemary Hall', type:'private', city:'Wallingford', state:'CT', zip:'06492', phone:'(203) 697-2239', web:'https://www.choate.edu', grades:'9-12', enroll:901, locale:'Suburban', est:1896, desc:'Leading co-educational boarding school with notable alumni including JFK.', students:901, faculty:185, ratio:'5:1' },
  { id:55, name:'Deerfield Academy', type:'private', city:'Deerfield', state:'MA', zip:'01342', phone:'(413) 772-0241', web:'https://www.deerfield.edu', grades:'9-12', enroll:648, locale:'Rural', est:1797, desc:'A boarding school with a strong academic tradition in the Pioneer Valley.', students:648, faculty:120, ratio:'5:1' },
  { id:56, name:'Lawrenceville School', type:'private', city:'Lawrenceville', state:'NJ', zip:'08648', phone:'(609) 896-0400', web:'https://www.lawrenceville.org', grades:'9-12', enroll:820, locale:'Suburban', est:1810, desc:'Coeducational boarding school near Princeton with a distinctive house system.', students:820, faculty:170, ratio:'5:1' },
  { id:57, name:'Groton School', type:'private', city:'Groton', state:'MA', zip:'01450', phone:'(978) 448-7510', web:'https://www.groton.org', grades:'8-12', enroll:380, locale:'Rural', est:1884, desc:'Episcopal boarding school known for character development and civic leadership.', students:380, faculty:80, ratio:'5:1' },
  { id:58, name:'St. Paul\'s School', type:'private', city:'Concord', state:'NH', zip:'03301', phone:'(603) 229-4600', web:'https://www.sps.edu', grades:'9-12', enroll:541, locale:'Suburban', est:1856, desc:'Episcopal boarding school on a 2,000-acre campus near Concord, New Hampshire.', students:541, faculty:112, ratio:'5:1' },
  { id:59, name:'Milton Academy', type:'private', city:'Milton', state:'MA', zip:'02186', phone:'(617) 898-1798', web:'https://www.milton.edu', grades:'K-12', enroll:1000, locale:'Suburban', est:1798, desc:'Co-educational boarding and day school with strong arts and sciences.', students:1000, faculty:165, ratio:'6:1' },
  { id:60, name:'Sidwell Friends School', type:'private', city:'Washington', state:'DC', zip:'20016', phone:'(202) 537-8100', web:'https://www.sidwell.edu', grades:'PK-12', enroll:1153, locale:'Urban', est:1883, desc:'Quaker school in Washington D.C., known for educating children of US presidents.', students:1153, faculty:175, ratio:'7:1' },
  { id:61, name:'Trinity School', type:'private', city:'New York', state:'NY', zip:'10024', phone:'(212) 873-1650', web:'https://www.trinityschoolnyc.org', grades:'K-12', enroll:975, locale:'Urban', est:1709, desc:'One of the oldest independent schools in the US, on Manhattan\'s Upper West Side.', students:975, faculty:155, ratio:'6:1' },
  { id:62, name:'Collegiate School', type:'private', city:'New York', state:'NY', zip:'10024', phone:'(212) 812-8500', web:'https://www.collegiateschool.org', grades:'K-12', enroll:650, locale:'Urban', est:1628, desc:'Oldest school in the Western Hemisphere still in operation.', students:650, faculty:110, ratio:'6:1' },
  { id:63, name:'Spence School', type:'private', city:'New York', state:'NY', zip:'10128', phone:'(212) 289-5940', web:'https://www.spenceschool.org', grades:'K-12', enroll:665, locale:'Urban', est:1892, desc:'Elite all-girls school on Manhattan\'s Upper East Side.', students:665, faculty:115, ratio:'6:1' },
  { id:64, name:'Harvard-Westlake School', type:'private', city:'Los Angeles', state:'CA', zip:'90046', phone:'(310) 274-7281', web:'https://www.hw.com', grades:'7-12', enroll:1608, locale:'Urban', est:1900, desc:'Leading college preparatory school in Los Angeles with strong STEM and arts programmes.', students:1608, faculty:245, ratio:'7:1' },
  { id:65, name:'Brentwood School', type:'private', city:'Los Angeles', state:'CA', zip:'90049', phone:'(310) 476-9633', web:'https://www.bwscampus.com', grades:'K-12', enroll:1000, locale:'Urban', est:1972, desc:'Non-denominational college preparatory school in the Brentwood district of LA.', students:1000, faculty:150, ratio:'7:1' },
  { id:66, name:'The Webb Schools', type:'private', city:'Claremont', state:'CA', zip:'91711', phone:'(909) 482-5214', web:'https://www.webb.edu', grades:'9-12', enroll:410, locale:'Suburban', est:1922, desc:'Boarding school with a renowned palaeontology programme in the Inland Empire.', students:410, faculty:75, ratio:'6:1' },
  { id:67, name:'University of Chicago Laboratory Schools', type:'private', city:'Chicago', state:'IL', zip:'60637', phone:'(773) 702-9451', web:'https://www.ucls.uchicago.edu', grades:'N-12', enroll:2100, locale:'Urban', est:1896, desc:'Laboratory schools affiliated with the University of Chicago, founded by John Dewey.', students:2100, faculty:315, ratio:'7:1' },
  { id:68, name:'Latin School of Chicago', type:'private', city:'Chicago', state:'IL', zip:'60610', phone:'(312) 582-6000', web:'https://www.latinschool.org', grades:'K-12', enroll:1220, locale:'Urban', est:1888, desc:'Chicago\'s oldest independent school with a rigorous academic programme.', students:1220, faculty:176, ratio:'7:1' },
  { id:69, name:'Hockaday School', type:'private', city:'Dallas', state:'TX', zip:'75229', phone:'(214) 363-6311', web:'https://www.hockaday.org', grades:'PK-12', enroll:1100, locale:'Urban', est:1913, desc:'All-girls school in Dallas with boarding and day options.', students:1100, faculty:160, ratio:'7:1' },
  { id:70, name:'St. Mark\'s School of Texas', type:'private', city:'Dallas', state:'TX', zip:'75230', phone:'(214) 346-8700', web:'https://www.stmarksschool.org', grades:'1-12', enroll:870, locale:'Suburban', est:1906, desc:'Independent boys\' school considered among the finest in the Southwest.', students:870, faculty:136, ratio:'6:1' },
  { id:71, name:'Greenwich Country Day School', type:'private', city:'Greenwich', state:'CT', zip:'06831', phone:'(203) 863-5600', web:'https://www.gcds.net', grades:'N-9', enroll:1100, locale:'Suburban', est:1926, desc:'Non-denominational co-educational school in affluent Greenwich, Connecticut.', students:1100, faculty:165, ratio:'7:1' },
  { id:72, name:'Lawrenceville School', type:'private', city:'Lawrenceville', state:'NJ', zip:'08648', phone:'(609) 896-0400', web:'https://www.lawrenceville.org', grades:'9-12', enroll:820, locale:'Suburban', est:1810, desc:'A distinguished boarding and day school with a unique house system.', students:820, faculty:168, ratio:'5:1' },
  { id:73, name:'Menlo School', type:'private', city:'Atherton', state:'CA', zip:'94027', phone:'(650) 330-2001', web:'https://www.menloschool.org', grades:'6-12', enroll:800, locale:'Suburban', est:1915, desc:'Co-educational college preparatory school in the heart of Silicon Valley.', students:800, faculty:105, ratio:'8:1' },
  { id:74, name:'Regis Jesuit High School', type:'private', city:'Aurora', state:'CO', zip:'80014', phone:'(303) 269-8100', web:'https://www.regisjesuit.com', grades:'9-12', enroll:950, locale:'Suburban', est:1877, desc:'Single-sex (boys) Jesuit high school in the Denver metro area.', students:950, faculty:90, ratio:'11:1' },
  { id:75, name:'Pope John Paul II High School', type:'private', city:'Hendersonville', state:'TN', zip:'37075', phone:'(615) 441-0700', web:'https://popejohnpaulii.com', grades:'9-12', enroll:700, locale:'Suburban', est:2008, desc:'Catholic co-educational high school in the Diocese of Nashville.', students:700, faculty:58, ratio:'12:1' }
];

/* ══════════════════════════════════════════════════════════
   APPLICATION STATE
══════════════════════════════════════════════════════════ */
let filtered   = [...INSTITUTIONS];
let curPage    = 1;
const PER_PAGE = 12;
let curView    = 'grid';   /* grid | list | table */
let curTab     = 'all';    /* all | college | public | private */
let compareSet = new Set();
let acIndex    = -1;
let acTimeout  = null;
let liveSearchTimeout = null;
let tableSortCol  = '';
let tableSortDir  = 'asc';

/* ══════════════════════════════════════════════════════════
   UTILITY HELPERS
══════════════════════════════════════════════════════════ */
const v     = id => (document.getElementById(id) || {}).value || '';
const $     = id => document.getElementById(id);
const show  = id => { const el = $(id); if(el) el.classList.remove('hidden'); };
const hide  = id => { const el = $(id); if(el) el.classList.add('hidden'); };
const esc   = s  => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const TYPE_COLORS = {
  college: '#1C8040',
  public:  '#005EA2',
  private: '#5B21B6'
};
const TYPE_LABELS = {
  college: 'College/University',
  public:  'Public School',
  private: 'Private School'
};
const TYPE_ICONS = {
  college: 'fa-university',
  public:  'fa-school',
  private: 'fa-award'
};

/* Institution tags — shown as badges on cards */
const INST_TAGS = {
  /* Colleges */
  1:  ['STEM','Research'],         2:  ['Research','Innovation'],
  3:  ['Ivy League','Historic'],   4:  ['Research','Liberal Arts'],
  5:  ['Ivy League','Historic'],   6:  ['Ivy League','Historic'],
  7:  ['Ivy League','Research'],   8:  ['Research','Medical'],
  9:  ['Public Ivy','Research'],   10: ['Public Ivy','Research'],
  11: ['Flagship','Research'],     12: ['STEM','Computing'],
  13: ['Public Ivy','Research'],   14: ['STEM','Computing'],
  15: ['Research','Global'],       16: ['Ivy League','Business'],
  17: ['Research','Medical'],      18: ['Research','Journalism'],
  19: ['Ivy League','Research'],   20: ['Ivy League','Liberal Arts'],
  21: ['Ivy League','Open Curriculum'], 22: ['Catholic','Research'],
  23: ['Research','Medical'],      24: ['STEM','Research'],
  25: ['Research','Medical'],      26: ['Jesuit','Policy'],
  27: ['Public Ivy','Historic'],   28: ['Flagship','Research'],
  29: ['Land-Grant','Research'],   30: ['Flagship','Research'],
  /* Public schools */
  31: ['Magnet','STEM'],           32: ['Historic','Selective'],
  33: ['Magnet','Selective'],      34: ['Magnet','STEM'],
  35: ['Residential','STEM'],      36: ['Magnet','IB Program'],
  37: ['Historic','Selective'],    38: ['Magnet','College Prep'],
  39: ['Dual Enrollment'],         40: ['Magnet','STEM'],
  41: ['Residential','STEM'],      42: ['Top Ranked'],
  43: ['Top Ranked'],              44: ['Top Ranked'],
  45: ['Comprehensive'],           46: ['Top Ranked'],
  47: ['Arts & Music'],            48: ['Award-Winning'],
  49: ['Award-Winning'],           50: ['Global Ecology'],
  /* Private schools */
  51: ['Boarding','Elite Prep'],   52: ['Boarding','Harkness Method'],
  53: ['Boarding','Historic'],     54: ['Boarding','Historic'],
  55: ['Boarding','Historic'],     56: ['Boarding','Historic'],
  57: ['Boarding','Episcopal'],    58: ['Boarding','Episcopal'],
  59: ['Day & Boarding'],          60: ['Day School','Presidential'],
  61: ['Historic','NYC'],          62: ['Oldest in US'],
  63: ['All-Girls','NYC'],         64: ['College Prep','LA'],
  65: ['College Prep','LA'],       66: ['Boarding','Paleontology'],
  67: ['Lab School','Dewey'],      68: ['Historic','Jesuit'],
  69: ['All-Girls','Boarding'],    70: ['All-Boys','Episcopal'],
  71: ['Day School'],              72: ['Boarding','House System'],
  73: ['Day School','Silicon Valley'], 74: ['Jesuit','Boys'],
  75: ['Catholic','Co-Ed']
};

function institutionInitials(name) {
  return name.split(/\s+/).filter(w => /^[A-Z]/.test(w)).slice(0,2).map(w => w[0]).join('') || name[0].toUpperCase();
}

/* ══════════════════════════════════════════════════════════
   BOOTSTRAP
══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  populateStateSelect();
  renderTypeRadios();
  renderStateCartogram();
  renderRecentSearches();
  bindListeners();
  initScrollReveal();
  initBackToTop();
  animateCounters();
  loadHashState(); /* restore search from URL if present */
  runSearch();
  updateTypeCounts();
});

/* ══════════════════════════════════════════════════════════
   POPULATE CONTROLS
══════════════════════════════════════════════════════════ */
function populateStateSelect() {
  const sel = $('fState');
  if (!sel) return;
  sel.innerHTML = '<option value="">All States</option>' +
    STATES.map(([code, name]) => `<option value="${code}">${name}</option>`).join('');
}

/* ══════════════════════════════════════════════════════════
   SEARCH & FILTER
══════════════════════════════════════════════════════════ */
function runSearch() {
  const name   = v('fName').trim().toLowerCase();
  const city   = v('fCity').trim().toLowerCase();
  const zip    = v('fZip').trim();
  const state  = v('fState');
  const radius = parseInt(v('fRadius')) || 0;
  const sort   = v('fSort') || 'name';

  /* curTab is the single source of truth for type filtering */
  filtered = INSTITUTIONS.filter(inst => {
    if (name              && !inst.name.toLowerCase().includes(name))   return false;
    if (city              && !inst.city.toLowerCase().includes(city))   return false;
    if (state             && inst.state !== state)                       return false;
    if (curTab !== 'all'  && inst.type  !== curTab)                      return false;
    if (zip && radius > 0 && !zipInRadius(inst.zip, zip, radius))        return false;
    return true;
  });

  filtered.sort((a, b) => {
    if (sort === 'name')    return a.name.localeCompare(b.name);
    if (sort === 'enroll')  return b.enroll - a.enroll;
    if (sort === 'est')     return a.est - b.est;
    if (sort === 'state')   return a.state.localeCompare(b.state);
    return 0;
  });

  /* Save recent only if there's a meaningful query */
  if (name || city || zip || state || curTab !== 'all') saveRecent({ name, city, zip, state, type: curTab === 'all' ? '' : curTab });

  curPage = 1;
  renderResults();
  renderActiveChips();
  updateTypeCounts();
  renderDataDashboard();
  saveHashState();
  closeAC();
}

function zipInRadius(instZip, targetZip, miles) {
  /* Simplified: same 3-digit prefix = ~within region */
  if (!instZip || !targetZip) return true;
  const prefix = Math.max(1, Math.floor(miles / 50));
  return instZip.slice(0, prefix + 1) === targetZip.slice(0, prefix + 1);
}

/* Live search — fires after 280ms idle */
function scheduleLiveSearch() {
  clearTimeout(liveSearchTimeout);
  liveSearchTimeout = setTimeout(runSearch, 280);
}

/* ══════════════════════════════════════════════════════════
   EVENT LISTENERS
══════════════════════════════════════════════════════════ */
function bindListeners() {
  /* Nav search button */
  const searchBtn = $('searchBtn');
  if (searchBtn) searchBtn.addEventListener('click', () => {
    document.getElementById('mainContent')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* Hero search */
  const heroSearch = $('heroSearchBtn');
  if (heroSearch) heroSearch.addEventListener('click', () => {
    const hn = v('hName');
    const hc = v('hCity');
    const hs = v('hState');
    if (hn) { const el = $('fName'); if(el) el.value = hn; }
    if (hc) { const el = $('fCity'); if(el) el.value = hc; }
    if (hs) { const el = $('fState'); if(el) el.value = hs; }
    document.getElementById('mainContent')?.scrollIntoView({ behavior: 'smooth' });
    runSearch();
  });

  /* Hero enter key */
  ['hName','hCity','hState'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('keydown', e => { if(e.key==='Enter') $('heroSearchBtn')?.click(); });
  });

  /* Quick pills */
  document.querySelectorAll('.quick-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.dataset.q;
      const t = pill.dataset.type;
      if (q) { const el = $('fName'); if(el) el.value = q; }
      if (t) { setTab(t); }
      document.getElementById('mainContent')?.scrollIntoView({ behavior: 'smooth' });
      if (!t) runSearch();
    });
  });

  /* Sidebar filter events */
  ['fCity','fZip','fRadius','fSort'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('change', runSearch);
  });
  /* State dropdown also updates the cartogram highlight */
  const fStateEl = $('fState');
  if (fStateEl) fStateEl.addEventListener('change', () => { runSearch(); renderStateCartogram(); });

  /* Live search on name input */
  const fName = $('fName');
  if (fName) {
    fName.addEventListener('input', () => { scheduleLiveSearch(); onNameInput(); });
    fName.addEventListener('keydown', handleAcKey);
    fName.addEventListener('blur', () => setTimeout(closeAC, 180));
    fName.addEventListener('focus', onNameInput);
  }

  /* City live search */
  const fCity = $('fCity');
  if (fCity) fCity.addEventListener('input', scheduleLiveSearch);

  /* Gov banner toggle */
  const bannerToggle = $('bannerToggle');
  const bannerPanel  = $('bannerPanel');
  if (bannerToggle && bannerPanel) {
    bannerToggle.addEventListener('click', () => {
      bannerPanel.classList.toggle('open');
      bannerToggle.textContent = bannerPanel.classList.contains('open')
        ? "Here's how you know ▴"
        : "Here's how you know ▾";
    });
  }

  /* Clear filters */
  const clearBtn = $('clearFilters');
  if (clearBtn) clearBtn.addEventListener('click', clearAllFilters);

  /* Collapsible filter groups */
  document.querySelectorAll('.filter-group-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      hdr.closest('.filter-group').classList.toggle('open');
    });
  });

  /* Keyboard shortcuts */
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    const inInput = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';
    if (e.key === '/' && !inInput) {
      e.preventDefault();
      $('fName')?.focus();
    }
    if (e.key === '?' && !inInput) {
      e.preventDefault();
      showKeyboardHelp();
    }
    if (e.key === 'Escape') { closeAC(); closeModal(); closeCompareModal(); closeKeyboardHelp(); }
    if (e.key === 'p' && (e.ctrlKey || e.metaKey)) { /* print handled by browser */ }
  });

  /* Keyboard modal overlay click */
  const kbdModal = $('kbdModal');
  if (kbdModal) kbdModal.addEventListener('click', e => { if (e.target === kbdModal) closeKeyboardHelp(); });

  /* Modal close on overlay click */
  const detailModal = $('detailModal');
  if (detailModal) detailModal.addEventListener('click', e => { if(e.target === detailModal) closeModal(); });

  const compareModalEl = $('compareModal');
  if (compareModalEl) compareModalEl.addEventListener('click', e => { if(e.target === compareModalEl) closeCompareModal(); });

  /* Inline sort select syncs with sidebar sort */
  const fSortInline = $('fSortInline');
  if (fSortInline) fSortInline.addEventListener('change', () => {
    const fs = $('fSort');
    if (fs) fs.value = fSortInline.value;
    runSearch();
  });
  const fSort = $('fSort');
  if (fSort) fSort.addEventListener('change', () => {
    const fsi = $('fSortInline');
    if (fsi) fsi.value = fSort.value;
  });

  /* Print button */
  const printBtn = $('printBtn');
  if (printBtn) printBtn.addEventListener('click', () => window.print());

  /* Export + keyboard help */
  const exportBtn = $('exportBtn');
  if (exportBtn) exportBtn.addEventListener('click', exportCSV);
  const helpBtn = $('helpBtn');
  if (helpBtn) helpBtn.addEventListener('click', showKeyboardHelp);
}

/* ══════════════════════════════════════════════════════════
   TYPE RADIO BUTTONS
══════════════════════════════════════════════════════════ */
function renderTypeRadios() {
  const container = $('typeRadioGroup');
  if (!container) return;
  const types = [
    { value: '', label: 'All Institutions', icon: 'fa-layer-group' },
    { value: 'college', label: 'Colleges & Universities', icon: 'fa-university' },
    { value: 'public',  label: 'Public Schools', icon: 'fa-school' },
    { value: 'private', label: 'Private Schools', icon: 'fa-award' }
  ];
  container.innerHTML = types.map(t => `
    <label class="type-radio ${curTab === (t.value || 'all') ? 'selected' : ''}" onclick="setTab('${t.value || 'all'}')">
      <input type="radio" name="fTypeRadio" value="${t.value}" ${curTab === (t.value || 'all') ? 'checked' : ''}>
      <div class="type-radio-dot"></div>
      <i class="fas ${t.icon}" style="color:${t.value ? TYPE_COLORS[t.value] : 'var(--text-muted)'}; font-size:12px; width:14px;"></i>
      <span class="type-radio-label">${t.label}</span>
      <span class="type-radio-count" id="rcount-${t.value || 'all'}">–</span>
    </label>
  `).join('');
}

function setType(type) {
  /* Delegate to setTab which is the single source of truth */
  setTab(type || 'all');
}

function updateTypeCounts() {
  const name  = v('fName').trim().toLowerCase();
  const city  = v('fCity').trim().toLowerCase();
  const state = v('fState');
  const zip   = v('fZip').trim();
  const radius = parseInt(v('fRadius')) || 0;

  const baseFiltered = INSTITUTIONS.filter(inst => {
    if (name  && !inst.name.toLowerCase().includes(name))   return false;
    if (city  && !inst.city.toLowerCase().includes(city))   return false;
    if (state && inst.state !== state)                       return false;
    if (zip && radius > 0 && !zipInRadius(inst.zip, zip, radius)) return false;
    return true;
  });

  const counts = { all: baseFiltered.length, college: 0, public: 0, private: 0 };
  baseFiltered.forEach(inst => counts[inst.type]++);

  Object.entries(counts).forEach(([key, val]) => {
    /* Sidebar radio count badge */
    const rcEl = document.getElementById(`rcount-${key}`);
    if (rcEl) rcEl.textContent = val.toLocaleString();
    /* Tab button count badge */
    const tbEl = document.querySelector(`.tab-btn[data-tab="${key}"] .tab-count`);
    if (tbEl) tbEl.textContent = val.toLocaleString();
  });
}

/* ══════════════════════════════════════════════════════════
   TYPE TABS
══════════════════════════════════════════════════════════ */
function setTab(tab, skipSearch = false) {
  curTab = tab;
  /* Sync fType hidden select */
  const ft = $('fType');
  if (ft) ft.value = tab === 'all' ? '' : tab;
  /* Sync tab buttons */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const active = btn.dataset.tab === tab;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  /* Sync sidebar radio buttons */
  document.querySelectorAll('.type-radio').forEach(r => {
    const radioVal = r.querySelector('input')?.value || '';
    r.classList.toggle('selected', (tab === 'all' ? '' : tab) === radioVal);
  });
  if (!skipSearch) runSearch();
}

/* ══════════════════════════════════════════════════════════
   AUTOCOMPLETE
══════════════════════════════════════════════════════════ */
function onNameInput() {
  const q = v('fName').trim();
  if (q.length < 2) { closeAC(); return; }
  clearTimeout(acTimeout);
  acTimeout = setTimeout(() => renderAC(q), 180);
}

function renderAC(q) {
  const box = $('acBox');
  if (!box) return;
  const lq = q.toLowerCase();
  const matches = INSTITUTIONS.filter(i => i.name.toLowerCase().includes(lq)).slice(0, 7);
  if (!matches.length) { box.classList.add('hidden'); return; }
  box.innerHTML = matches.map(inst => `
    <div class="ac-item" role="option" tabindex="-1" data-inst-id="${inst.id}" onclick="selectAC(${inst.id})">
      <div class="ac-icon" style="background:${TYPE_COLORS[inst.type]}">
        <i class="fas ${TYPE_ICONS[inst.type]}"></i>
      </div>
      <div>
        <div style="font-weight:700;font-size:13px;">${highlight(esc(inst.name), q)}</div>
        <div style="font-size:11px;color:var(--text-muted);">${inst.city}, ${inst.state} · ${TYPE_LABELS[inst.type]}</div>
      </div>
    </div>
  `).join('') + `<div class="ac-footer">↑↓ navigate · Enter select · Esc close</div>`;
  box.classList.remove('hidden');
  acIndex = -1;
  const wrap = $('acWrap');
  if (wrap) wrap.setAttribute('aria-expanded', 'true');
}

function highlight(text, q) {
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) return text;
  return text.slice(0, idx) + '<mark>' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length);
}

function handleAcKey(e) {
  const box = $('acBox');
  if (!box || box.classList.contains('hidden')) return;
  const items = box.querySelectorAll('.ac-item');
  if (!items.length) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    acIndex = Math.min(acIndex + 1, items.length - 1);
    items.forEach((el, i) => el.classList.toggle('ac-active', i === acIndex));
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    acIndex = Math.max(acIndex - 1, -1);
    items.forEach((el, i) => el.classList.toggle('ac-active', i === acIndex));
  } else if (e.key === 'Enter' && acIndex >= 0) {
    e.preventDefault();
    const instId = parseInt(items[acIndex].dataset.instId);
    const inst = INSTITUTIONS.find(i => i.id === instId);
    if (inst) { $('fName').value = inst.name; closeAC(); runSearch(); }
  } else if (e.key === 'Escape') {
    closeAC();
  }
}

function selectAC(id) {
  const inst = INSTITUTIONS.find(i => i.id === id);
  if (!inst) return;
  $('fName').value = inst.name;
  closeAC();
  runSearch();
}

function closeAC() {
  const box = $('acBox');
  if (box) box.classList.add('hidden');
  const wrap = $('acWrap');
  if (wrap) wrap.setAttribute('aria-expanded', 'false');
  acIndex = -1;
}

/* ══════════════════════════════════════════════════════════
   RECENT SEARCHES
══════════════════════════════════════════════════════════ */
function saveRecent(q) {
  if (!q.name && !q.city && !q.state && !q.type) return;
  const label = [q.name, q.city, q.state && STATES.find(s=>s[0]===q.state)?.[1], q.type && TYPE_LABELS[q.type]].filter(Boolean).join(' · ').slice(0, 48);
  if (!label) return;
  let recents = JSON.parse(localStorage.getItem('el_recent') || '[]');
  recents = recents.filter(r => r.label !== label);
  recents.unshift({ label, q, ts: Date.now() });
  recents = recents.slice(0, 8);
  localStorage.setItem('el_recent', JSON.stringify(recents));
  renderRecentSearches();
}

function renderRecentSearches() {
  const row = $('recentRow');
  if (!row) return;
  const recents = JSON.parse(localStorage.getItem('el_recent') || '[]');
  if (!recents.length) { row.innerHTML = ''; return; }
  row.innerHTML = `
    <div class="recent-row">
      <div class="recent-lbl"><i class="fas fa-history"></i> Recent searches
        <button onclick="clearRecent()" style="background:none;border:none;font-size:10px;color:var(--text-muted);cursor:pointer;margin-left:auto;font-family:inherit;">Clear</button>
      </div>
      <div class="recent-chips">
        ${recents.map((r, i) => `
          <button class="recent-chip" onclick="applyRecent(${i})" title="${esc(r.label)}">${esc(r.label)}</button>
        `).join('')}
      </div>
    </div>`;
}

function applyRecent(idx) {
  const recents = JSON.parse(localStorage.getItem('el_recent') || '[]');
  const r = recents[idx];
  if (!r) return;
  const q = r.q;
  if (q.name)  { const el = $('fName');  if(el) el.value = q.name;  }
  if (q.city)  { const el = $('fCity');  if(el) el.value = q.city;  }
  if (q.state) { const el = $('fState'); if(el) el.value = q.state; }
  if (q.type)  { const el = $('fType');  if(el) el.value = q.type;  setType(q.type); }
  runSearch();
}

function clearRecent() {
  localStorage.removeItem('el_recent');
  renderRecentSearches();
}

/* ══════════════════════════════════════════════════════════
   STATE CARTOGRAM
══════════════════════════════════════════════════════════ */
function renderStateCartogram() {
  const container = $('stateCartogram');
  if (!container) return;

  /* Count institutions per state */
  const stateCounts = {};
  INSTITUTIONS.forEach(inst => {
    stateCounts[inst.state] = (stateCounts[inst.state] || 0) + 1;
  });
  const maxCount = Math.max(...Object.values(stateCounts));

  /* Build the grid */
  container.innerHTML = '';
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(12,1fr)';
  container.style.gridTemplateRows    = 'repeat(8,24px)';
  container.style.gap = '2px';

  const activeState = v('fState');

  Object.entries(STATE_GRID).forEach(([code, [row, col]]) => {
    const count = stateCounts[code] || 0;
    const density = count === 0 ? 0
      : count <= 1 ? 1
      : count <= 3 ? 2
      : count <= 6 ? 3 : 4;

    const tile = document.createElement('div');
    tile.className = `state-tile density-${density}${activeState === code ? ' active' : ''}`;
    tile.style.gridRow    = `${row + 1}`;
    tile.style.gridColumn = `${col + 1}`;
    tile.setAttribute('title', `${code} — ${count} institution${count !== 1 ? 's' : ''}`);
    tile.setAttribute('role', 'button');
    tile.setAttribute('aria-label', `Filter by ${code}`);
    tile.setAttribute('data-state', code);
    tile.innerHTML = `<span class="st-abbr">${code}</span>`;
    tile.addEventListener('click', () => filterByState(code));
    container.appendChild(tile);
  });
}

function filterByState(code) {
  const el = $('fState');
  if (!el) return;
  if (el.value === code) {
    el.value = '';
    showToast('Cleared state filter');
  } else {
    el.value = code;
    const stateName = STATES.find(s => s[0] === code)?.[1] || code;
    showToast(`Showing institutions in ${stateName}`);
  }
  runSearch();
  renderStateCartogram(); /* re-render to update active state */
}

/* ══════════════════════════════════════════════════════════
   RENDER RESULTS
══════════════════════════════════════════════════════════ */
function renderResults() {
  const grid   = $('resultsGrid');
  const noRes  = $('noResults');
  const label  = $('resultCount');
  const badge  = $('resultBadge');

  if (!grid) return;

  if (label) label.textContent = filtered.length.toLocaleString();
  if (badge) badge.textContent = filtered.length;

  if (!filtered.length) {
    grid.innerHTML = '';
    grid.className = '';
    renderNoResults();
    if (noRes) noRes.classList.remove('hidden');
    renderPagination();
    return;
  }

  if (noRes) noRes.classList.add('hidden');

  const start = (curPage - 1) * PER_PAGE;
  const page  = filtered.slice(start, start + PER_PAGE);

  if (curView === 'table') {
    grid.className = '';
    grid.innerHTML = renderTableView(page);
    attachTableListeners();
  } else if (curView === 'list') {
    grid.className = 'results-list';
    grid.innerHTML = page.map(inst => listCard(inst)).join('');
  } else {
    grid.className = 'results-grid';
    grid.innerHTML = page.map(inst => gridCard(inst)).join('');
  }

  renderPagination();
}

function renderNoResults() {
  const el = $('noResults');
  if (!el) return;
  const name = v('fName').trim();
  el.innerHTML = `
    <div class="no-results-wrap">
      <div class="no-results-icon"><i class="fas fa-search"></i></div>
      <h3>No institutions found</h3>
      <p>We couldn't find any results matching your criteria. Try broadening your search.</p>
      ${name ? `
        <p style="font-size:13px;color:var(--text-muted);">Did you mean one of these?</p>
        <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px;">
          ${getSuggestions(name).map(s => `<button class="quick-pill" onclick="applySuggestion('${esc(s.name)}')">${esc(s.name)}</button>`).join('')}
        </div>
      ` : ''}
      <button class="clear-link" onclick="clearAllFilters()">Clear all filters and start over</button>
    </div>`;
}

function getSuggestions(q) {
  const words = q.toLowerCase().split(/\s+/);
  return INSTITUTIONS.filter(i => words.some(w => i.name.toLowerCase().includes(w))).slice(0, 4);
}

function applySuggestion(name) {
  const el = $('fName'); if(el) el.value = name;
  runSearch();
}

/* ── Grid card ── */
function gridCard(inst) {
  const color = TYPE_COLORS[inst.type];
  const inits = institutionInitials(inst.name);
  const isCmp = compareSet.has(inst.id);
  const tags  = (INST_TAGS[inst.id] || []).slice(0, 2)
    .map(t => `<span class="inst-tag">${esc(t)}</span>`).join('');
  return `
    <article class="result-card reveal" role="article" onclick="openModal(${inst.id})" tabindex="0" onkeydown="if(event.key==='Enter')openModal(${inst.id})">
      <div class="card-stripe" style="background:${color}"></div>
      <div class="compare-toggle ${isCmp ? 'selected' : ''}" title="Add to compare" onclick="event.stopPropagation();toggleCompare(${inst.id})" aria-label="Add to comparison">
        <i class="fas fa-check" style="font-size:9px;"></i>
      </div>
      <div class="card-body">
        <div class="card-top">
          <div class="card-avatar" style="background:${color}">${inits}</div>
          <div class="card-meta">
            <div class="card-type-badge badge-${inst.type}">
              <i class="fas ${TYPE_ICONS[inst.type]}"></i> ${inst.type === 'college' ? 'College' : inst.type === 'public' ? 'Public' : 'Private'}
            </div>
          </div>
          <span class="card-est">Est. ${inst.est}</span>
        </div>
        <div class="card-name">${esc(inst.name)}</div>
        ${tags ? `<div class="card-tags">${tags}</div>` : ''}
        <div class="card-location">
          <i class="fas fa-map-marker-alt" style="color:var(--text-muted);font-size:10px;"></i>
          ${esc(inst.city)}, ${inst.state} ${inst.zip}
        </div>
        <p class="card-desc">${esc(inst.desc)}</p>
        <div class="card-footer">
          <div class="card-stats">
            <div class="card-stat"><i class="fas fa-users" style="font-size:9px;"></i> <strong>${inst.enroll.toLocaleString()}</strong></div>
            <div class="card-stat"><i class="fas fa-map" style="font-size:9px;"></i> ${inst.locale}</div>
          </div>
          <button class="card-btn" onclick="event.stopPropagation();openModal(${inst.id})">View Details</button>
        </div>
      </div>
    </article>`;
}

/* ── List card ── */
function listCard(inst) {
  const color = TYPE_COLORS[inst.type];
  const inits = institutionInitials(inst.name);
  return `
    <article class="result-card-list reveal" onclick="openModal(${inst.id})" tabindex="0" onkeydown="if(event.key==='Enter')openModal(${inst.id})">
      <div class="list-stripe" style="background:${color}"></div>
      <div class="list-body">
        <div class="list-avatar" style="background:${color}">${inits}</div>
        <div class="list-info">
          <div class="list-name">${esc(inst.name)}</div>
          <div class="list-meta">
            <span><i class="fas fa-map-marker-alt" style="font-size:9px;"></i> ${esc(inst.city)}, ${inst.state}</span>
            <span><i class="fas ${TYPE_ICONS[inst.type]}" style="font-size:9px;"></i> ${TYPE_LABELS[inst.type]}</span>
            <span><i class="fas fa-users" style="font-size:9px;"></i> ${inst.enroll.toLocaleString()} students</span>
            <span>Est. ${inst.est}</span>
          </div>
        </div>
      </div>
      <div class="list-actions">
        <div class="compare-toggle ${compareSet.has(inst.id) ? 'selected' : ''}" title="Compare" onclick="event.stopPropagation();toggleCompare(${inst.id})">
          <i class="fas fa-check" style="font-size:9px;"></i>
        </div>
        <button class="card-btn" onclick="event.stopPropagation();openModal(${inst.id})">Details</button>
      </div>
    </article>`;
}

/* ── Table view ── */
function renderTableView(page) {
  const cols = [
    { key: 'name',   label: 'Institution Name' },
    { key: 'type',   label: 'Type' },
    { key: 'city',   label: 'City' },
    { key: 'state',  label: 'State' },
    { key: 'enroll', label: 'Enrollment' },
    { key: 'locale', label: 'Locale' },
    { key: 'est',    label: 'Est.' }
  ];
  return `
    <table class="results-table" role="grid">
      <thead><tr>
        ${cols.map(c => `<th onclick="sortTable('${c.key}')" title="Sort by ${c.label}">
          ${c.label} <i class="fas fa-${tableSortCol === c.key ? (tableSortDir==='asc'?'sort-up':'sort-down') : 'sort'}" style="font-size:9px;opacity:.5;"></i>
        </th>`).join('')}
        <th style="cursor:default;">Action</th>
      </tr></thead>
      <tbody>
        ${page.map(inst => `
          <tr onclick="openModal(${inst.id})" tabindex="0" onkeydown="if(event.key==='Enter')openModal(${inst.id})">
            <td>
              <div class="tbl-avatar">
                <div class="tbl-icon" style="background:${TYPE_COLORS[inst.type]}">${institutionInitials(inst.name)}</div>
                <div class="tbl-name">${esc(inst.name)}</div>
              </div>
            </td>
            <td><span class="card-type-badge badge-${inst.type}" style="white-space:nowrap;">${TYPE_LABELS[inst.type]}</span></td>
            <td>${esc(inst.city)}</td>
            <td>${inst.state}</td>
            <td>${inst.enroll.toLocaleString()}</td>
            <td>${inst.locale}</td>
            <td>${inst.est}</td>
            <td>
              <button class="card-btn" onclick="event.stopPropagation();openModal(${inst.id})" style="font-size:11px;padding:4px 10px;">View</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

function sortTable(col) {
  if (tableSortCol === col) tableSortDir = tableSortDir === 'asc' ? 'desc' : 'asc';
  else { tableSortCol = col; tableSortDir = 'asc'; }
  filtered.sort((a, b) => {
    const va = a[col]; const vb = b[col];
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb;
    return tableSortDir === 'asc' ? cmp : -cmp;
  });
  renderResults();
}

function attachTableListeners() {}

/* ══════════════════════════════════════════════════════════
   VIEW TOGGLE
══════════════════════════════════════════════════════════ */
function setView(view) {
  curView = view;
  document.querySelectorAll('.tool-btn[data-view]').forEach(btn => {
    const active = btn.dataset.view === view;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  renderResults();
}

/* ══════════════════════════════════════════════════════════
   ACTIVE FILTER CHIPS
══════════════════════════════════════════════════════════ */
function renderActiveChips() {
  const row = $('activeChips');
  if (!row) return;
  const chips = [];
  if (v('fName'))        chips.push({ label: `Name: "${v('fName')}"`,                      id: 'name'  });
  if (v('fCity'))        chips.push({ label: `City: "${v('fCity')}"`,                      id: 'city'  });
  if (v('fState')) {
    const sn = STATES.find(s => s[0] === v('fState'))?.[1] || v('fState');
    chips.push({ label: `State: ${sn}`, id: 'state' });
  }
  if (curTab !== 'all')  chips.push({ label: TYPE_LABELS[curTab],                          id: 'type'  });
  if (v('fZip') && parseInt(v('fRadius')) > 0) {
    chips.push({ label: `Within ${v('fRadius')} mi of ${v('fZip')}`, id: 'zip' });
  }
  row.innerHTML = chips.map(c => `
    <div class="chip">
      ${esc(c.label)}
      <button class="chip-x" onclick="clearFilter('${c.id}')" title="Remove filter" aria-label="Remove ${esc(c.label)} filter">✕</button>
    </div>`).join('');
}

/* Global function — accessible from inline onclick handlers */
function clearFilter(id) {
  if (id === 'name')  { const el = document.getElementById('fName');  if (el) el.value = ''; }
  if (id === 'city')  { const el = document.getElementById('fCity');  if (el) el.value = ''; }
  if (id === 'state') { const el = document.getElementById('fState'); if (el) el.value = ''; renderStateCartogram(); }
  if (id === 'zip')   { const el = document.getElementById('fZip');   if (el) el.value = ''; }
  if (id === 'type')  { setTab('all'); return; } /* setTab calls runSearch */
  runSearch();
}

function clearAllFilters() {
  ['fName','fCity','fZip'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  ['fState','fRadius','fSort'].forEach(id => { const el = $(id); if (el) el.value = ''; });
  renderStateCartogram();
  setTab('all'); /* resets curTab, syncs fType, tabs, radios, calls runSearch */
}

/* Global — called from inline onclick in compare bar */
function clearAllCompare() {
  compareSet.clear();
  renderCompareBar();
  renderResults();
}

/* ══════════════════════════════════════════════════════════
   LIVE DATA DASHBOARD  (type breakdown + key metrics)
══════════════════════════════════════════════════════════ */
function renderDataDashboard() {
  const ddCount    = $('ddCount');
  const ddEnroll   = $('ddEnroll');
  const ddFaculty  = $('ddFaculty');
  const distBar    = $('distBar');
  const distLegend = $('distLegend');
  if (!ddCount) return;

  const colleges = filtered.filter(i => i.type === 'college').length;
  const publics  = filtered.filter(i => i.type === 'public').length;
  const privates = filtered.filter(i => i.type === 'private').length;
  const total    = filtered.length;
  const totalEnroll  = filtered.reduce((s, i) => s + i.enroll,  0);
  const totalFaculty = filtered.reduce((s, i) => s + i.faculty, 0);

  function fmt(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(0) + 'K';
    return n.toString();
  }

  ddCount.textContent   = total.toLocaleString();
  ddEnroll.textContent  = fmt(totalEnroll);
  ddFaculty.textContent = fmt(totalFaculty);

  if (!distBar) return;
  if (!total) {
    distBar.innerHTML = '<div style="width:100%;height:100%;background:var(--border);border-radius:99px;"></div>';
    if (distLegend) distLegend.innerHTML = '<span style="font-size:11px;color:var(--text-muted);">No results</span>';
    return;
  }

  const pctC = (colleges / total * 100).toFixed(1);
  const pctP = (publics  / total * 100).toFixed(1);
  const pctR = (privates / total * 100).toFixed(1);

  distBar.innerHTML = [
    colleges ? `<div class="dist-segment" style="width:${pctC}%;background:var(--green);" title="${colleges} Colleges (${pctC}%)"></div>` : '',
    publics  ? `<div class="dist-segment" style="width:${pctP}%;background:var(--blue);"  title="${publics} Public (${pctP}%)"></div>` : '',
    privates ? `<div class="dist-segment" style="width:${pctR}%;background:#5B21B6;"      title="${privates} Private (${pctR}%)"></div>` : ''
  ].join('');

  if (distLegend) {
    distLegend.innerHTML = [
      colleges ? `<span class="dist-leg"><span style="background:var(--green)"></span>${colleges} College${colleges !== 1 ? 's' : ''} <em>${pctC}%</em></span>` : '',
      publics  ? `<span class="dist-leg"><span style="background:var(--blue)"></span>${publics} Public <em>${pctP}%</em></span>` : '',
      privates ? `<span class="dist-leg"><span style="background:#5B21B6"></span>${privates} Private <em>${pctR}%</em></span>` : ''
    ].filter(Boolean).join('');
  }
}

/* ══════════════════════════════════════════════════════════
   CSV EXPORT
══════════════════════════════════════════════════════════ */
function exportCSV() {
  if (!filtered.length) { showToast('No results to export'); return; }
  const headers = ['Name','Type','City','State','ZIP','Phone','Enrollment','Faculty','Student:Faculty','Grades','Locale','Established','Website'];
  const rows = filtered.map(inst => [
    `"${inst.name.replace(/"/g,'""')}"`,
    TYPE_LABELS[inst.type],
    inst.city,
    inst.state,
    inst.zip,
    inst.phone,
    inst.enroll,
    inst.faculty,
    inst.ratio,
    inst.grades,
    inst.locale,
    inst.est,
    inst.web || ''
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `nces-institutions-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Downloaded ${filtered.length} institution${filtered.length !== 1 ? 's' : ''} as CSV`);
}

/* ══════════════════════════════════════════════════════════
   URL HASH STATE  (shareable / bookmarkable searches)
══════════════════════════════════════════════════════════ */
function saveHashState() {
  const params = new URLSearchParams();
  const name = v('fName').trim();
  const city = v('fCity').trim();
  const state = v('fState');
  const zip = v('fZip').trim();
  const radius = v('fRadius');
  const sort = v('fSort');
  if (name)             params.set('name', name);
  if (city)             params.set('city', city);
  if (state)            params.set('state', state);
  if (curTab !== 'all') params.set('type', curTab);
  if (zip)              params.set('zip', zip);
  if (radius)           params.set('radius', radius);
  if (sort && sort !== 'name') params.set('sort', sort);
  const str = params.toString();
  try {
    history.replaceState(null, '', str ? '#' + str : window.location.pathname + window.location.search);
  } catch(e) { /* ignore – local file:// doesn't support replaceState in all browsers */ }
}

function loadHashState() {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  try {
    const params = new URLSearchParams(hash);
    const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    setVal('fName',   params.get('name'));
    setVal('fCity',   params.get('city'));
    setVal('fState',  params.get('state'));
    setVal('fZip',    params.get('zip'));
    setVal('fRadius', params.get('radius'));
    setVal('fSort',   params.get('sort'));
    const type = params.get('type');
    if (type && type !== 'all') { setTab(type, true); }
    renderStateCartogram();
    showToast('Restored saved search from link');
  } catch(e) { /* silently skip malformed hash */ }
}

/* ══════════════════════════════════════════════════════════
   KEYBOARD SHORTCUT HELP MODAL
══════════════════════════════════════════════════════════ */
function showKeyboardHelp() {
  const modal = $('kbdModal');
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeKeyboardHelp() {
  const modal = $('kbdModal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ══════════════════════════════════════════════════════════
   SKELETON LOADING
══════════════════════════════════════════════════════════ */
function showSkeleton() {
  const grid = $('resultsGrid');
  if (!grid) return;
  const count = curView === 'list' ? 6 : 9;
  grid.className = curView === 'list' ? 'results-list' : 'results-grid';
  grid.innerHTML = Array.from({ length: count }, () => `
    <div class="skeleton-card">
      <div class="sk-header"></div>
      <div class="sk-line sk-wide"></div>
      <div class="sk-line sk-medium"></div>
      <div class="sk-line sk-narrow"></div>
      <div class="sk-footer"></div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════════════════
   PAGINATION
══════════════════════════════════════════════════════════ */
function renderPagination() {
  const el = $('pagination');
  if (!el) return;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  if (totalPages <= 1) { el.innerHTML = ''; return; }

  let html = `<button class="pg-btn" onclick="goPage(${curPage-1})" ${curPage<=1?'disabled':''} aria-label="Previous"><i class="fas fa-chevron-left"></i></button>`;

  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || (p >= curPage-1 && p <= curPage+1)) {
      html += `<button class="pg-btn ${p===curPage?'active':''}" onclick="goPage(${p})" aria-current="${p===curPage?'page':'false'}">${p}</button>`;
    } else if (p === curPage-2 || p === curPage+2) {
      html += `<span class="pg-ellipsis">…</span>`;
    }
  }

  html += `<button class="pg-btn" onclick="goPage(${curPage+1})" ${curPage>=totalPages?'disabled':''} aria-label="Next"><i class="fas fa-chevron-right"></i></button>`;
  el.innerHTML = html;
}

function goPage(p) {
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  if (p < 1 || p > totalPages) return;
  curPage = p;
  renderResults();
  $('mainContent')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ══════════════════════════════════════════════════════════
   DETAIL MODAL
══════════════════════════════════════════════════════════ */
function openModal(id) {
  const inst = INSTITUTIONS.find(i => i.id === id);
  if (!inst) return;
  const color = TYPE_COLORS[inst.type];
  const inits = institutionInitials(inst.name);
  const modal = $('detailModal');
  const inner = $('modalInner');
  if (!modal || !inner) return;

  inner.innerHTML = `
    <div class="modal-header" style="background:linear-gradient(135deg, ${color}dd, ${color}88)">
      <div class="modal-header-pattern"></div>
      <button class="modal-close-btn" onclick="closeModal()" aria-label="Close"><i class="fas fa-times"></i></button>
      <div class="modal-avatar-row">
        <div class="modal-avatar" style="color:${color}; font-family:'Merriweather',serif;">${inits}</div>
        <div>
          <div class="card-type-badge badge-${inst.type}" style="margin-bottom:5px;">
            <i class="fas ${TYPE_ICONS[inst.type]}"></i> ${TYPE_LABELS[inst.type]}
          </div>
        </div>
      </div>
    </div>
    <div class="modal-body">
      <h2 class="modal-title">${esc(inst.name)}</h2>
      <p class="modal-address">
        <i class="fas fa-map-marker-alt" style="color:var(--text-muted);font-size:11px;"></i>
        ${esc(inst.city)}, ${inst.state} ${inst.zip}
      </p>
      <p class="modal-desc">${esc(inst.desc)}</p>
      <div class="modal-stats-grid">
        <div class="modal-stat-box">
          <div class="modal-stat-num">${inst.students.toLocaleString()}</div>
          <div class="modal-stat-lbl">Students</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-num">${inst.faculty.toLocaleString()}</div>
          <div class="modal-stat-lbl">Faculty</div>
        </div>
        <div class="modal-stat-box">
          <div class="modal-stat-num">${inst.ratio}</div>
          <div class="modal-stat-lbl">Student:Faculty</div>
        </div>
      </div>
      <div class="modal-detail-list">
        <div class="modal-detail-row">
          <div class="modal-detail-icon" style="background:var(--blue-light);color:var(--blue);"><i class="fas fa-phone"></i></div>
          <div><span class="modal-detail-lbl">Phone</span>${esc(inst.phone)}</div>
        </div>
        <div class="modal-detail-row">
          <div class="modal-detail-icon" style="background:var(--green-lt);color:var(--green);"><i class="fas fa-graduation-cap"></i></div>
          <div><span class="modal-detail-lbl">Grade Span</span>${esc(inst.grades)}</div>
        </div>
        <div class="modal-detail-row">
          <div class="modal-detail-icon" style="background:var(--gold-lt);color:var(--gold);"><i class="fas fa-calendar-alt"></i></div>
          <div><span class="modal-detail-lbl">Established</span>${inst.est}</div>
        </div>
        <div class="modal-detail-row">
          <div class="modal-detail-icon" style="background:#F3E8FF;color:#5B21B6;"><i class="fas fa-city"></i></div>
          <div><span class="modal-detail-lbl">Locale</span>${inst.locale}</div>
        </div>
      </div>
      <div class="modal-actions">
        ${inst.web ? `<a href="${esc(inst.web)}" target="_blank" rel="noopener noreferrer" class="modal-btn-primary">
          <i class="fas fa-external-link-alt"></i> Visit Official Website
        </a>` : ''}
        <button class="modal-btn-secondary" onclick="toggleCompare(${inst.id});closeModal();">
          <i class="fas ${compareSet.has(inst.id) ? 'fa-minus' : 'fa-plus'}"></i>
          ${compareSet.has(inst.id) ? 'Remove Compare' : 'Add to Compare'}
        </button>
        <button class="modal-btn-secondary" onclick="closeModal()" aria-label="Close">Close</button>
      </div>
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = $('detailModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════
   COMPARE
══════════════════════════════════════════════════════════ */
function toggleCompare(id) {
  if (compareSet.has(id)) {
    compareSet.delete(id);
  } else {
    if (compareSet.size >= 3) { showToast('You can compare up to 3 institutions at a time'); return; }
    compareSet.add(id);
  }
  renderCompareBar();
  renderResults(); /* refresh checkmarks */
}

function renderCompareBar() {
  const bar    = $('compareBar');
  const items  = $('compareItems');
  const count  = $('compareCount');
  if (!bar) return;

  if (!compareSet.size) {
    bar.classList.remove('visible');
    return;
  }
  bar.classList.add('visible');
  if (count) count.textContent = compareSet.size;
  if (items) {
    const insts = [...compareSet].map(id => INSTITUTIONS.find(i => i.id === id)).filter(Boolean);
    items.innerHTML = insts.map(inst => `
      <div class="cmp-bar-item">
        <div class="cmp-thumb" style="background:${TYPE_COLORS[inst.type]}">${institutionInitials(inst.name)}</div>
        <div class="cmp-name" title="${esc(inst.name)}">${esc(inst.name)}</div>
        <button class="cmp-remove" onclick="toggleCompare(${inst.id})" title="Remove"><i class="fas fa-times"></i></button>
      </div>
      <div class="cmp-sep"></div>
    `).join('');
  }
}

function openCompareModal() {
  if (compareSet.size < 2) { showToast('Select at least 2 institutions to compare'); return; }
  const modal = $('compareModal');
  const inner = $('compareInner');
  if (!modal || !inner) return;

  const insts = [...compareSet].map(id => INSTITUTIONS.find(i => i.id === id)).filter(Boolean);
  const rows = [
    ['Type',        i => `<span class="card-type-badge badge-${i.type}">${TYPE_LABELS[i.type]}</span>`],
    ['Location',    i => `${esc(i.city)}, ${i.state}`],
    ['Established', i => i.est],
    ['Enrollment',  i => i.students.toLocaleString()],
    ['Faculty',     i => i.faculty.toLocaleString()],
    ['Student:Faculty', i => i.ratio],
    ['Locale',      i => i.locale],
    ['Grades',      i => esc(i.grades)],
    ['Phone',       i => esc(i.phone)],
    ['Website',     i => i.web ? `<a href="${esc(i.web)}" target="_blank" rel="noopener" style="color:var(--blue);">Visit ↗</a>` : '—']
  ];

  inner.innerHTML = `
    <div style="background:var(--navy);padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-radius:14px 14px 0 0;">
      <h2 style="font-family:'Merriweather',serif;font-size:16px;color:#fff;margin:0;">Side-by-Side Comparison</h2>
      <button onclick="closeCompareModal()" style="background:rgba(255,255,255,.15);border:none;color:#fff;border-radius:4px;width:32px;height:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;"><i class="fas fa-times"></i></button>
    </div>
    <div style="overflow-x:auto;">
      <table class="cmp-table">
        <thead><tr>
          <th class="cmp-label">Field</th>
          ${insts.map(inst => `<th>
            <div class="cmp-head-cell">
              <div class="cmp-thumb" style="background:${TYPE_COLORS[inst.type]}">${institutionInitials(inst.name)}</div>
              <div style="font-size:12px;font-weight:700;color:var(--text);">${esc(inst.name)}</div>
            </div>
          </th>`).join('')}
        </tr></thead>
        <tbody>
          ${rows.map(([lbl, fn]) => `
            <tr>
              <td class="cmp-label">${lbl}</td>
              ${insts.map(inst => `<td>${fn(inst)}</td>`).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCompareModal() {
  const modal = $('compareModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════════════
   ANIMATED COUNTERS
══════════════════════════════════════════════════════════ */
function animateCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const target = parseInt(e.target.dataset.target);
      const duration = 1600;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const val = Math.round(ease * target);
        e.target.textContent = val >= 1000 ? val.toLocaleString() : val;
        if (progress < 1) requestAnimationFrame(step);
        else e.target.textContent = target >= 1000 ? target.toLocaleString() : target;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = $('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ══════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════ */
function showToast(msg, duration = 2800) {
  let toast = $('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL — observe cards post-render
══════════════════════════════════════════════════════════ */
(function patchReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.05 });
  const grid = document.getElementById('resultsGrid');
  if (!grid) return;
  new MutationObserver(() => {
    grid.querySelectorAll('.reveal:not(.visible)').forEach(el => io.observe(el));
  }).observe(grid, { childList: true });
})();
