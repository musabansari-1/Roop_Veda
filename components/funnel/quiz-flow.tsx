// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import {
//   QUIZ_ANSWERS_STORAGE_KEY,
//   readAttribution,
//   setActiveLead
// } from "@/lib/meta/attribution";
// import {
//   createEventId,
//   trackBrowserMetaEvent,
//   trackServerMetaEvent
// } from "@/lib/meta/browser";
// import TopBar from "./top-bar";

// const StarRating = () => (
//   <svg
//     width="100"
//     height="19"
//     viewBox="0 0 6248 1172"
//     xmlns="http://www.w3.org/2000/svg"
//     aria-label="4.5 out of 5 stars"
//   >
//     {[0, 1269, 2538, 3807].map((x, i) => (
//       <g key={i}>
//         <rect x={x} width={1171} height={1172} fill="#f57f96" />
//         <polygon
//           points={`${x + 585},229 ${x + 681},492 ${x + 961},501 ${x + 740},673 ${x + 817},942 ${x + 585},785 ${x + 353},942 ${x + 431},673 ${x + 210},501 ${x + 490},492`}
//           fill="white"
//         />
//       </g>
//     ))}
//     <rect x={5076} width={1172} height={1172} fill="#ffd9df" />
//     <rect x={5076} width={586} height={1172} fill="#f57f96" />
//     <polygon
//       points="5662,229 5757,492 6037,501 5816,673 5894,942 5662,785 5430,942 5508,673 5286,501 5566,492"
//       fill="white"
//     />
//   </svg>
// );

// const LockIcon = () => (
//   <svg
//     width="16"
//     height="16"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z" />
//   </svg>
// );

// const emailCaptureStyles: Record<string, React.CSSProperties> = {
//   page: {
//     minHeight: "100vh",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "linear-gradient(135deg, #fff2f4 0%, #ffc3cc 52%, #ffdde2 100%)",
//     padding: "24px 16px",
//     fontFamily: "'Georgia', 'Times New Roman', serif"
//   },
//   card: {
//     background: "#ffffff",
//     borderRadius: "20px",
//     boxShadow:
//       "0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 60px -10px rgba(245,127,150,0.22)",
//     maxWidth: "540px",
//     width: "100%",
//     padding: "36px 32px 28px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "0px"
//   },
//   header: { marginBottom: "20px" },
//   logoRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: "12px"
//   },
//   logoText: {
//     fontSize: "28px",
//     fontWeight: 800,
//     letterSpacing: "-0.5px",
//     color: "#111827",
//     fontFamily: "'Georgia', serif"
//   },
//   logoAccent: { color: "#f57f96" },
//   logoReg: { fontSize: "12px", color: "#6b7280", verticalAlign: "super" },
//   ratingRow: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-end",
//     gap: "4px"
//   },
//   excellentText: {
//     fontSize: "12px",
//     fontWeight: 700,
//     color: "#111827",
//     fontFamily: "sans-serif",
//     letterSpacing: "0.5px",
//     textTransform: "uppercase"
//   },
//   divider: {
//     height: "1px",
//     background: "linear-gradient(to right, transparent, #e5e7eb, transparent)",
//     margin: "0 0 24px"
//   },
//   heroSection: {
//     textAlign: "center",
//     marginBottom: "28px"
//   },
//   badge: {
//     display: "inline-block",
//     background: "#ffe7eb",
//     color: "#cc4b68",
//     fontSize: "13px",
//     fontWeight: 600,
//     padding: "5px 14px",
//     borderRadius: "999px",
//     border: "1px solid #ffc3cc",
//     marginBottom: "14px",
//     fontFamily: "sans-serif",
//     letterSpacing: "0.3px"
//   },
//   heading: {
//     fontSize: "clamp(26px, 5vw, 34px)",
//     fontWeight: 800,
//     color: "#111827",
//     lineHeight: 1.2,
//     margin: "0 0 10px",
//     letterSpacing: "-0.5px"
//   },
//   headingAccent: { color: "#e85d7f" },
//   subheading: {
//     fontSize: "16px",
//     color: "#4b5563",
//     margin: 0,
//     fontFamily: "sans-serif",
//     lineHeight: 1.5
//   },
//   strong: { color: "#111827" },
//   formWrapper: { marginBottom: "16px" },
//   form: { width: "100%" },
//   inputRow: {
//     display: "flex",
//     gap: "10px",
//     alignItems: "flex-end",
//     flexWrap: "wrap"
//   },
//   inputWrapper: {
//     flex: "1 1 200px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px"
//   },
//   label: {
//     fontSize: "13px",
//     fontWeight: 600,
//     color: "#374151",
//     fontFamily: "sans-serif"
//   },
//   input: {
//     width: "100%",
//     padding: "12px 14px",
//     border: "1.5px solid #d1d5db",
//     borderRadius: "10px",
//     fontSize: "15px",
//     color: "#111827",
//     fontFamily: "sans-serif",
//     outline: "none",
//     boxSizing: "border-box"
//   },
//   inputError: { borderColor: "#ef4444" },
//   errorText: {
//     fontSize: "12px",
//     color: "#ef4444",
//     margin: "2px 0 0",
//     fontFamily: "sans-serif"
//   },
//   button: {
//     flex: "0 0 auto",
//     padding: "12px 20px",
//     background: "linear-gradient(135deg, #ff8fa3 0%, #e85d7f 100%)",
//     color: "#fff",
//     border: "none",
//     borderRadius: "10px",
//     fontSize: "15px",
//     fontWeight: 700,
//     cursor: "pointer",
//     whiteSpace: "nowrap",
//     fontFamily: "sans-serif",
//     boxShadow: "0 4px 14px rgba(232,93,127,0.35)"
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//     cursor: "not-allowed"
//   },
//   trustBar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: "10px",
//     padding: "12px 0",
//     borderTop: "1px solid #f3f4f6",
//     borderBottom: "1px solid #f3f4f6",
//     marginBottom: "16px"
//   },
//   trustLeft: {
//     display: "flex",
//     alignItems: "center",
//     gap: "6px"
//   },
//   lockColor: { color: "#e85d7f", display: "flex", alignItems: "center" },
//   trustText: {
//     fontSize: "12px",
//     color: "#6b7280",
//     fontFamily: "sans-serif"
//   },
//   trustLogos: {
//     display: "flex",
//     gap: "12px",
//     alignItems: "center"
//   },
//   trustBadge: {
//     fontSize: "11px",
//     fontWeight: 700,
//     color: "#374151",
//     fontFamily: "sans-serif",
//     letterSpacing: "0.5px",
//     textTransform: "uppercase"
//   },
//   legal: {
//     fontSize: "11.5px",
//     color: "#9ca3af",
//     lineHeight: 1.6,
//     margin: 0,
//     fontFamily: "sans-serif",
//     textAlign: "center"
//   },
//   legalLink: {
//     color: "#374151",
//     fontWeight: 700,
//     textDecoration: "underline"
//   }
// };

// // const QUESTIONS = [
// //   {
// //     id: 0,
// //     question: "Would you like to eliminate wrinkles, hooded eyelids, neck lines & look 10 years younger?",
// //     type: "gender",
// //     options: [
// //       { label: "👨 Male",   value: "male",   img: "https://cdn.hoola.com/faceyoga-cms/1765369700175_1760430171864_thumbnail_man_c6dc188129.webp" },
// //       { label: "👩 Female", value: "female", img: "https://cdn.hoola.com/faceyoga-cms/1765369692185_1760430181414_thumbnail_woman_288a247836.webp" },
// //     ],
// //   // Removed subquestion
// //   },
// //   {
// //     id: 1,
// //     question: "What is your age?",
// //     type: "single",
// //     options: [
// //       { emoji: "🌱", label: "18-24" },
// //       { emoji: "✨", label: "25-34" },
// //       { emoji: "🌸", label: "35-44" },
// //       { emoji: "🌺", label: "45-54" },
// //       { emoji: "🌻", label: "55-64" },
// //       { emoji: "🍀", label: "65+" },
// //     ],
// //   },
// //   {
// //     id: 2,
// //     question: "Which areas concern you the most?",
// //     type: "multi",
// //     options: [
// //       { emoji: "👁️",  label: "Hooded / droopy eyelids" },
// //       { emoji: "😮",  label: "Sagging cheeks & jowls" },
// //       { emoji: "💋",  label: "Lip lines & thinning lips" },
// //       { emoji: "😤",  label: "Double chin & neck lines" },
// //       { emoji: "😑",  label: "Forehead wrinkles" },
// //       { emoji: "🙁",  label: "Nasolabial folds (smile lines)" },
// //     ],
// //   },
// //   {
// //     id: 3,
// //     question: "How would you describe your current skin condition?",
// //     type: "single",
// //     options: [
// //       { emoji: "🌟", label: "Firm and elastic" },
// //       { emoji: "💧", label: "Slightly loose" },
// //       { emoji: "😕", label: "Noticeably sagging" },
// //       { emoji: "😟", label: "Very loose and wrinkled" },
// //     ],
// //   },
// //   {
// //     id: 4,
// //     question: "Have you tried any face exercises or routines before?",
// //     type: "single",
// //     options: [
// //       { emoji: "✅", label: "Yes, regularly" },
// //       { emoji: "🔄", label: "A few times" },
// //       { emoji: "❌", label: "Never" },
// //     ],
// //   },
// //   {
// //     id: 5,
// //     question: "How much time can you dedicate daily to face yoga?",
// //     type: "single",
// //     options: [
// //       { emoji: "⏱️", label: "5 minutes" },
// //       { emoji: "🕐", label: "10 minutes" },
// //       { emoji: "🕕", label: "15-20 minutes" },
// //       { emoji: "🏆", label: "30+ minutes" },
// //     ],
// //   },
// //   {
// //     id: 6,
// //     question: "What is your primary goal with Face Yoga?",
// //     type: "single",
// //     options: [
// //       { emoji: "⏪", label: "Look younger" },
// //       { emoji: "💪", label: "Tone & firm facial muscles" },
// //       { emoji: "😌", label: "Reduce stress & relax" },
// //       { emoji: "✨", label: "Improve skin glow" },
// //       { emoji: "🎯", label: "All of the above" },
// //     ],
// //   },
// //   {
// //     id: 7,
// //     question: "How did you hear about Face Yoga?",
// //     type: "single",
// //     options: [
// //       { emoji: "📱", label: "Social media" },
// //       { emoji: "👭", label: "Friend or family" },
// //       { emoji: "📰", label: "Article or blog" },
// //       { emoji: "📺", label: "TV or podcast" },
// //       { emoji: "🔍", label: "Online search" },
// //     ],
// //   },
// //   {
// //     id: 8,
// //     question: "Have you heard about Face Yoga before?",
// //     type: "single",
// //     options: [
// //       { emoji: "🧘‍♂️", label: "Yes" },
// //       { emoji: "🤏", label: "I have heard a little bit" },
// //       { emoji: "🤔", label: "No" },
// //     ],
// //   },
// //   {
// //     id: 9,
// //     question: "Choose your skin type",
// //     type: "multi",
// //     options: [
// //       { emoji: "🧘‍♀️", label: "Normal" },
// //       { emoji: "🌵", label: "Dry" },
// //       { emoji: "⚡️", label: "Sensitive" },
// //       { emoji: "🥑", label: "Oily" },
// //       { emoji: "🤏", label: "Combination" },
// //       { emoji: "🤷‍♂️", label: "Not sure" },
// //     ],
// //   },
// //   {
// //     id: 10,
// //     question: "Do you have any of the following skin concerns?",
// //     type: "multi",
// //     subLabel: "Select all that apply",
// //     options: [
// //       { emoji: "🫣", label: "Acne" },
// //       { emoji: "🌵", label: "Dryness" },
// //       { emoji: "👤", label: "Neck lines" },
// //       { emoji: "🥹", label: "Hooded eyelids" },
// //       { emoji: "🗿", label: "Wrinkles" },
// //       { emoji: "🥑", label: "Oiliness" },
// //       { emoji: "⚫️", label: "Dark spots" },
// //       { emoji: "✅", label: "None of the above" },
// //     ],
// //   },
// //   {
// //     id: 11,
// //     question: "How would you describe your skin's sensitivity level?",
// //     type: "single",
// //     options: [
// //       { emoji: "⚡️", label: "Very sensitive" },
// //       { emoji: "🤏", label: "Moderately sensitive" },
// //       { emoji: "🔅", label: "Not sensitive" },
// //       { emoji: "🤷‍♂️", label: "Not sure" },
// //     ],
// //   },
// //   {
// //     id: 12,
// //     question: "Have you noticed any loss of elasticity or firmness in your skin?",
// //     type: "single",
// //     options: [
// //       { emoji: "👍", label: "Yes" },
// //       { emoji: "👎", label: "No" },
// //       { emoji: "🤷‍♂️", label: "Not sure" },
// //     ],
// //   },
// //   {
// //     id: 13,
// //     question: "Worried about results? Over 45,132 people improved their skin condition with Face Yoga",
// //     type: "info",
// //     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
// //     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
// //     caption: "See how your face can change in just a few weeks!",
// //   },
// //   {
// //     id: 14,
// //     question: "How many hours do you sleep on average per night?",
// //     type: "single",
// //     options: [
// //       { emoji: "😴️", label: "Less than 6 hours" },
// //       { emoji: "💤", label: "6-8 hours" },
// //       { emoji: "🛌", label: "More than 8 hours" },
// //     ],
// //   },
// //   {
// //     id: 15,
// //     question: "How would you rate your daily stress level?",
// //     type: "single",
// //     options: [
// //       { emoji: "🌿", label: "Low" },
// //       { emoji: "⚖️", label: "Moderate" },
// //       { emoji: "💥", label: "High" },
// //     ],
// //   },
// //   {
// //     id: 16,
// //     question: "What is your daily water intake?",
// //     type: "single",
// //     options: [
// //       { emoji: "💧", label: "1-2 glasses a day" },
// //       { emoji: "🥤", label: "2-6 glasses a day" },
// //       { emoji: "🌊", label: "More than 6 glasses" },
// //     ],
// //   },
// //   {
// //     id: 17,
// //     question: "Do you smoke?",
// //     type: "single",
// //     options: [
// //       { emoji: "🚬", label: "Yes" },
// //       { emoji: "🚭", label: "No" },
// //     ],
// //   },
// //   {
// //     id: 18,
// //     question: "How often do you consume alcohol?",
// //     type: "single",
// //     options: [
// //       { emoji: "🍷", label: "Almost daily" },
// //       { emoji: "🍸", label: "A few times a week" },
// //       { emoji: "🥂", label: "A few times a month" },
// //       { emoji: "🙅", label: "Almost never" },
// //     ],
// //   },
// //   {
// //     id: 19,
// //     question: "How often do you exercise?",
// //     type: "single",
// //     options: [
// //       { emoji: "🚴‍♂️", label: "Daily" },
// //       { emoji: "🤸‍♂️", label: "A few times a week" },
// //       { emoji: "🗓", label: "Rarely" },
// //       { emoji: "🙅", label: "Almost never" },
// //     ],
// //   },
// //   {
// //     id: 20,
// //     question: "Do you use sunscreen regularly?",
// //     type: "single",
// //     options: [
// //       { emoji: "👍", label: "Yes" },
// //       { emoji: "👎", label: "No" },
// //     ],
// //   },
// //   {
// //     id: 21,
// //     question: "How often do you cleanse and moisturize your face?",
// //     type: "single",
// //     options: [
// //       { emoji: "👌", label: "More than once a day" },
// //       { emoji: "🤞", label: "Once a day" },
// //       { emoji: "✌️", label: "A few times a week" },
// //       { emoji: "🙅", label: "Never" },
// //     ],
// //   },
// //   {
// //     id: 22,
// //     question: "How often do you visit a cosmetologist?",
// //     type: "single",
// //     options: [
// //       { emoji: "👌", label: "Once per month or more" },
// //       { emoji: "✌️", label: "Once in several months" },
// //       { emoji: "🤞", label: "Once a year" },
// //       { emoji: "🙅", label: "Never" },
// //     ],
// //   },
// //   {
// //     id: 23,
// //     question: "How would you describe your diet?",
// //     type: "single",
// //     options: [
// //       { emoji: "⚖️", label: "Balanced" },
// //       { emoji: "🥦", label: "Vegetarian/Vegan" },
// //       { emoji: "🥫", label: "Inconsistent" },
// //       { emoji: "🍔", label: "High in processed foods" },
// //       { emoji: "🥩", label: "High-protein" },
// //       { emoji: "🍲", label: "Other" },
// //     ],
// //   },
// //   {
// //     id: 24,
// //     question: "Do you experience any recurring facial discomforts such as jaw clenching, teeth grinding, or frequent headaches?",
// //     type: "single",
// //     options: [
// //       { emoji: "👍", label: "Yes" },
// //       { emoji: "👎", label: "No" },
// //       { emoji: "🤷‍♂️", label: "Not sure" },
// //     ],
// //   },
// //   {
// //     id: 25,
// //     question: "How many hours per day do you spend in front of screens (computer, phone, tablet, etc.)?",
// //     type: "single",
// //     options: [
// //       { emoji: "🤏", label: "Less than 2 hours" },
// //       { emoji: "🕑", label: "2-5 hours" },
// //       { emoji: "🕓", label: "5-8 hours" },
// //       { emoji: "⏳", label: "More than 8 hours" },
// //     ],
// //   },
// //   {
// //     id: 26,
// //     question: "How often do you experience facial tension or discomfort?",
// //     type: "single",
// //     options: [
// //       { emoji: "😩", label: "Often" },
// //       { emoji: "😬", label: "Sometimes" },
// //       { emoji: "🙄", label: "Rarely" },
// //       { emoji: "🙅", label: "Never" },
// //     ],
// //   },
// //   {
// //     id: 27,
// //     question: "What is your name?",
// //     type: "text",
// //     placeholder: "First Name",
// //   },
// //   {
// //     id: 28,
// //     question: "What is your age?",
// //     type: "number",
// //     placeholder: "Age",
// //   },
// //   {
// //     id: 29,
// //     question: "You have great potential to crush your goals!",
// //     type: "info",
// //     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
// //     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
// //     caption: "See how your face can change in just a few weeks!",
// //   },
// //   {
// //     id: 30,
// //     question: "How much time are you willing to dedicate to Face Yoga daily?",
// //     type: "single",
// //     options: [
// //       { emoji: "🤏", label: "Less than 5 minutes" },
// //       { emoji: "✌️", label: "5-10 minutes" },
// //       { emoji: "🙌", label: "More than 10 minutes" },
// //     ],
// //   },
// //   {
// //     id: 31,
// //     question: "What are your main goals for practicing face yoga?",
// //     type: "multi",
// //     subLabel: "Select all that apply",
// //     options: [
// //       { emoji: "👸", label: "Improve skin appearance" },
// //       { emoji: "🧏‍♀️", label: "Fix hooded eyelids" },
// //       { emoji: "👧", label: "Look younger" },
// //       { emoji: "👩", label: "Reduce wrinkles" },
// //       { emoji: "👱‍♀️", label: "Eliminate double-chin" },
// //       { emoji: "☝️", label: "All of the above" },
// //     ],
// //   },
// //   {
// //     id: 32,
// //     question: "Once you reach perfect skin with Face Yoga, how would you see yourself?",
// //     type: "single",
// //     options: [
// //       { emoji: "👍", label: "Being proud of myself" },
// //       { emoji: "🥰", label: "Feeling sexier" },
// //       { emoji: "👑", label: "More confident" },
// //       { emoji: "☝️", label: "All of the above" },
// //     ],
// //   },
// //   {
// //     id: 33,
// //     question: "After reaching your goal, how would you reward yourself?",
// //     type: "single",
// //     options: [
// //       { emoji: "👗", label: "Buying new clothes" },
// //       { emoji: "✈️", label: "Travelling somewhere new" },
// //       { emoji: "😎", label: "Taking a personal day" },
// //       { emoji: "📸", label: "Taking more pictures" },
// //       { emoji: "🥂", label: "Fun hang-out with friends" },
// //       { emoji: "🎁", label: "Other" },
// //     ],
// //   },
// //   {
// //     id: 34,
// //     question: "We predict you will enjoy skin that looks younger and has less facial fat in two weeks!",
// //     type: "info",
// //     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
// //     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283738603_female-after.b483bbc117cb9f38e0ec.webp",
// //     caption: "See how your face can change in just a few weeks!",
// //   },
// // ];

// const QUESTIONS = [
//   {
//     id: 0,
//     question: "Would you like to eliminate wrinkles, hooded eyelids, neck lines & look 10 years younger?",
//     type: "gender",
//     options: [
//       { label: "👨 Male", value: "male", img: "https://cdn.hoola.com/faceyoga-cms/1765369700175_1760430171864_thumbnail_man_c6dc188129.webp" },
//       { label: "👩 Female", value: "female", img: "https://cdn.hoola.com/faceyoga-cms/1765369692185_1760430181414_thumbnail_woman_288a247836.webp" },
//     ],
//   },
//   {
//     id: 2,
//     question: "Have you heard about Face Yoga before?",
//     type: "single",
//     options: [
//       { emoji: "🧘‍♂️", label: "Yes" },
//       { emoji: "🤏", label: "I have heard a little bit" },
//       { emoji: "🤔", label: "No" },
//     ],
//   },
//   {
//     id: 3,
//     question: "Choose your skin type",
//     type: "multi",
//     options: [
//       { emoji: "🧘‍♀️", label: "Normal" },
//       { emoji: "🌵", label: "Dry" },
//       { emoji: "⚡️", label: "Sensitive" },
//       { emoji: "🥑", label: "Oily" },
//       { emoji: "🤏", label: "Combination" },
//       { emoji: "🤷‍♂️", label: "Not sure" },
//     ],
//   },
//   {
//     id: 4,
//     question: "Do you have any of the following skin concerns?",
//     type: "multi",
//     subLabel: "Select all that apply",
//     options: [
//       { emoji: "🫣", label: "Acne" },
//       { emoji: "🌵", label: "Dryness" },
//       { emoji: "👤", label: "Neck lines" },
//       { emoji: "🥹", label: "Hooded eyelids" },
//       { emoji: "🗿", label: "Wrinkles" },
//       { emoji: "🥑", label: "Oiliness" },
//       { emoji: "⚫️", label: "Dark spots" },
//       { emoji: "✅", label: "None of the above" },
//     ],
//   },
//   {
//     id: 5,
//     question: "How would you describe your skin's sensitivity level?",
//     type: "single",
//     options: [
//       { emoji: "⚡️", label: "Very sensitive" },
//       { emoji: "🤏", label: "Moderately sensitive" },
//       { emoji: "🔅", label: "Not sensitive" },
//       { emoji: "🤷‍♂️", label: "Not sure" },
//     ],
//   },
//   {
//     id: 6,
//     question: "Worried about results? Over 45,132 people improved their skin condition with Face Yoga",
//     type: "info",
//     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
//     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
//     caption: "See how your face can change in just a few weeks!",
//   },
//   {
//     id: 7,
//     question: "How many hours do you sleep on average per night?",
//     type: "single",
//     options: [
//       { emoji: "😴️", label: "Less than 6 hours" },
//       { emoji: "💤", label: "6-8 hours" },
//       { emoji: "🛌", label: "More than 8 hours" },
//     ],
//   },
//   {
//     id: 8,
//     question: "What is your daily water intake?",
//     type: "single",
//     options: [
//       { emoji: "💧", label: "1-2 glasses a day" },
//       { emoji: "🥤", label: "2-6 glasses a day" },
//       { emoji: "🌊", label: "More than 6 glasses" },
//     ],
//   },
//   {
//     id: 9,
//     question: "How often do you exercise?",
//     type: "single",
//     options: [
//       { emoji: "🚴‍♂️", label: "Daily" },
//       { emoji: "🤸‍♂️", label: "A few times a week" },
//       { emoji: "🗓", label: "Rarely" },
//       { emoji: "🙅", label: "Almost never" },
//     ],
//   },
//   {
//     id: 10,
//     question: "How often do you cleanse and moisturize your face?",
//     type: "single",
//     options: [
//       { emoji: "👌", label: "More than once a day" },
//       { emoji: "🤞", label: "Once a day" },
//       { emoji: "✌️", label: "A few times a week" },
//       { emoji: "🙅", label: "Never" },
//     ],
//   },
//   {
//     id: 11,
//     question: "How would you describe your diet?",
//     type: "single",
//     options: [
//       { emoji: "⚖️", label: "Balanced" },
//       { emoji: "🥦", label: "Vegetarian/Vegan" },
//       { emoji: "🥫", label: "Inconsistent" },
//       { emoji: "🍔", label: "High in processed foods" },
//       { emoji: "🥩", label: "High-protein" },
//       { emoji: "🍲", label: "Other" },
//     ],
//   },
//   {
//     id: 12,
//     question: "How many hours per day do you spend in front of screens (computer, phone, tablet, etc.)?",
//     type: "single",
//     options: [
//       { emoji: "🤏", label: "Less than 2 hours" },
//       { emoji: "🕑", label: "2-5 hours" },
//       { emoji: "🕓", label: "5-8 hours" },
//       { emoji: "⏳", label: "More than 8 hours" },
//     ],
//   },
//   {
//     id: 13,
//     question: "What is your name?",
//     type: "text",
//     placeholder: "First Name",
//   },
//   {
//     id: 20,
//     question: "What is your age?",
//     type: "number",
//     placeholder: "Age",
//   },
//   {
//     id: 14,
//     question: "You have great potential to crush your goals!",
//     type: "info",
//     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
//     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
//     caption: "See how your face can change in just a few weeks!",
//   },
//   {
//     id: 15,
//     question: "How much time are you willing to dedicate to Face Yoga daily?",
//     type: "single",
//     options: [
//       { emoji: "🤏", label: "Less than 5 minutes" },
//       { emoji: "✌️", label: "5-10 minutes" },
//       { emoji: "🙌", label: "More than 10 minutes" },
//     ],
//   },
//   {
//     id: 16,
//     question: "What are your main goals for practicing face yoga?",
//     type: "multi",
//     subLabel: "Select all that apply",
//     options: [
//       { emoji: "👸", label: "Improve skin appearance" },
//       { emoji: "🧏‍♀️", label: "Fix hooded eyelids" },
//       { emoji: "👧", label: "Look younger" },
//       { emoji: "👩", label: "Reduce wrinkles" },
//       { emoji: "👱‍♀️", label: "Eliminate double-chin" },
//       { emoji: "☝️", label: "All of the above" },
//     ],
//   },
//   {
//     id: 17,
//     question: "Once you reach perfect skin with Face Yoga, how would you see yourself?",
//     type: "single",
//     options: [
//       { emoji: "👍", label: "Being proud of myself" },
//       { emoji: "🥰", label: "Feeling sexier" },
//       { emoji: "👑", label: "More confident" },
//       { emoji: "☝️", label: "All of the above" },
//     ],
//   },
//   {
//     id: 18,
//     question: "After reaching your goal, how would you reward yourself?",
//     type: "single",
//     options: [
//       { emoji: "👗", label: "Buying new clothes" },
//       { emoji: "✈️", label: "Travelling somewhere new" },
//       { emoji: "😎", label: "Taking a personal day" },
//       { emoji: "📸", label: "Taking more pictures" },
//       { emoji: "🥂", label: "Fun hang-out with friends" },
//       { emoji: "🎁", label: "Other" },
//     ],
//   },
//   {
//     id: 19,
//     question: "We predict you will enjoy skin that looks younger and has less facial fat in two weeks!",
//     type: "info",
//     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
//     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283738603_female-after.b483bbc117cb9f38e0ec.webp",
//     caption: "See how your face can change in just a few weeks!",
//   },
// ];

// const TOTAL_STEPS = QUESTIONS.length;

// // Sub-components
// function GenderStep({ onSelect, subAnswer, setSubAnswer }: {
//   onSelect: (val: any) => void;
//   subAnswer: string | null;
//   setSubAnswer: (val: string | null) => void;
// }) {
//   const q = QUESTIONS[0] as any;
//   const [selected, setSelected] = useState<string | null>(null);
//   const handleGender = (val: string) => {
//     if (!selected) {
//       setSelected(val);
//       setTimeout(() => onSelect(val), 300);
//     }
//   };
//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
//       <div className="grid grid-cols-2 gap-4 sm:gap-6">
//         {q.options && q.options.map((opt: any) => (
//           <button
//             key={opt.value}
//             className={`rounded-2xl border-2 p-3 text-center transition-all bg-white ${
//               selected === opt.value
//                 ? "border-ember bg-sand/20 shadow-lg"
//                 : "border-mist hover:border-ember/40"
//             }`}
//             onClick={() => handleGender(opt.value)}
//             disabled={!!selected}
//           >
//             <img src={opt.img} alt={opt.label} className="w-full h-40 object-cover rounded-lg mb-2" />
//             <p className="font-semibold text-forest">{opt.label}</p>
//             {selected === opt.value && <span className="block text-ember font-bold mt-2">✓</span>}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// function SingleStep({ q, onSelect }: {
//   q: any;
//   onSelect: (val: string) => void;
// }) {
//   const [selected, setSelected] = useState<string | null>(null);
//   const handle = (val: string) => {
//     setSelected(val);
//     setTimeout(() => onSelect(val), 300);
//   };

//   return (
//     <div className="space-y-6 w-full">
//       <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
//       <div className={`grid gap-3 ${q.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
//         {q.options.map((o: any) => (
//           <button
//             key={o.label}
//             className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 text-left ${
//               selected === o.label
//                 ? "border-ember bg-sand/20"
//                 : "border-mist hover:border-ember/40 bg-white"
//             }`}
//             onClick={() => handle(o.label)}
//           >
//             <span className="text-2xl">{o.emoji}</span>
//             <span className="font-medium flex-1">{o.label}</span>
//             {selected === o.label && <span className="text-ember font-bold">✓</span>}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MultiStep({ q, onNext }: {
//   q: any;
//   onNext: (val: string[]) => void;
// }) {
//   const [selected, setSelected] = useState<string[]>([]);
//   const toggle = (label: string) => {
//     setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label]);
//   };

//   return (
//     <div className="space-y-6 w-full">
//       <div>
//         <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
//         {q.subLabel && <p className="text-center text-sm text-forest/60 mt-2">{q.subLabel}</p>}
//       </div>
//       <div className={`grid gap-3 ${q.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
//         {q.options.map((o: any) => (
//           <button
//             key={o.label}
//             className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 text-left ${
//               selected.includes(o.label)
//                 ? "border-ember bg-sand/20"
//                 : "border-mist hover:border-ember/40 bg-white"
//             }`}
//             onClick={() => toggle(o.label)}
//           >
//             <span className="text-2xl">{o.emoji}</span>
//             <span className="font-medium flex-1">{o.label}</span>
//             {selected.includes(o.label) && <span className="text-ember font-bold">✓</span>}
//           </button>
//         ))}
//       </div>
//       <button
//         className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${
//           selected.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
//         }`}
//         disabled={selected.length === 0}
//         onClick={() => onNext(selected)}
//       >
//         Continue →
//       </button>
//     </div>
//   );
// }

// function TextStep({ q, onSelect }: {
//   q: any;
//   onSelect: (val: string) => void;
// }) {
//   const [value, setValue] = useState("");
//   const handle = () => {
//     if (value.trim()) {
//       setTimeout(() => onSelect(value), 300);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
//       <div className="space-y-4">
//         <input
//           type="text"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder={q.placeholder}
//           className="w-full p-4 border-2 border-mist rounded-lg text-center text-2xl font-semibold focus:outline-none focus:border-ember"
//           onKeyPress={(e) => e.key === "Enter" && handle()}
//         />
//         <button
//           className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${
//             !value.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
//           }`}
//           disabled={!value.trim()}
//           onClick={handle}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }

// function NumberStep({ q, onSelect }: {
//   q: any;
//   onSelect: (val: string) => void;
// }) {
//   const [value, setValue] = useState("");
//   const handle = () => {
//     if (value.trim()) {
//       setTimeout(() => onSelect(value), 300);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
//       <div className="space-y-4">
//         <input
//           type="number"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder={q.placeholder}
//           className="w-full p-4 border-2 border-mist rounded-lg text-center text-2xl font-semibold focus:outline-none focus:border-ember"
//           onKeyPress={(e) => e.key === "Enter" && handle()}
//         />
//         <button
//           className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${
//             !value.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
//           }`}
//           disabled={!value.trim()}
//           onClick={handle}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }

// function InfoStep({ q, onContinue }: {
//   q: any;
//   onContinue: () => void;
// }) {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
//       </div>
//       <div className="bg-white rounded-2xl p-6 space-y-4">
//         <div className="flex flex-col items-center gap-4">
//           <img src={q.beforeImg} alt="Before" className="w-32 h-40 object-cover rounded-lg" />
//           <svg className="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M8.59 16.59L12 13.17l3.41 3.42 1.41-1.41L13.41 12l3.41-3.41-1.41-1.41L12 10.59 8.59 7.17 7.17 8.59 10.59 12l-3.42 3.41 1.41 1.41z"/>
//           </svg>
//           <img src={q.afterImg} alt="After" className="w-32 h-40 object-cover rounded-lg" />
//         </div>
//         {q.caption && <p className="text-center font-semibold text-forest">{q.caption}</p>}
//       </div>
//       <button
//         className="w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all hover:bg-forest/90"
//         onClick={onContinue}
//       >
//         Continue →
//       </button>
//     </div>
//   );
// }

// // Main component
// export function QuizFlow() {
//   const router = useRouter();
//   const [step, setStep] = useState(0);
//   const [subAnswer, setSubAnswer] = useState<string | null>(null);
//   const [answers, setAnswers] = useState<Record<number, any>>({});
//   const [showEmailCapture, setShowEmailCapture] = useState(false);
//   const [email, setEmail] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const eventId = createEventId();
//     const attribution = readAttribution();
//     const eventSourceUrl = window.location.href;

//     trackBrowserMetaEvent("ViewContent", eventId, { content_name: "quiz" });
//     void trackServerMetaEvent({
//       eventName: "ViewContent",
//       eventId,
//       eventSourceUrl,
//       attribution: attribution ?? undefined,
//       customData: {
//         source: attribution?.source
//       }
//     });
//   }, []);

//     const progress = Math.round((step / TOTAL_STEPS) * 100);

//     const advance = (val: any) => {
//       const newAnswers = { ...answers, [step]: val };
//       setAnswers(newAnswers);
//       window.localStorage.setItem(
//         QUIZ_ANSWERS_STORAGE_KEY,
//         JSON.stringify(newAnswers)
//       );

//       if (step + 1 >= TOTAL_STEPS) {
//         setShowEmailCapture(true);
//       } else {
//         setStep(s => s + 1);
//       }
//     };

//     async function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
//       event.preventDefault();
//       setSubmitting(true);
//       setError(null);

//       const eventId = createEventId();
//       const attribution = readAttribution();
//       const eventSourceUrl = window.location.href;

//       trackBrowserMetaEvent("Lead", eventId, {
//         content_name: "quiz_email_capture"
//       });

//       try {
//         const stringifiedAnswers: Record<string, string> = {};
//         for (const [key, value] of Object.entries(answers)) {
//           stringifiedAnswers[key] = Array.isArray(value) ? value.join(", ") : String(value);
//         }

//         const response = await fetch("/api/lead", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             email,
//             quizAnswers: stringifiedAnswers,
//             eventId,
//             eventSourceUrl,
//             attribution
//           })
//         });

//         let data: { error?: string; leadId?: string } = {};

//         try {
//           data = (await response.json()) as { error?: string; leadId?: string };
//         } catch (parseError) {
//           console.error("[quiz] Failed to parse lead response", parseError);
//         }

//         if (!response.ok || !data.leadId) {
//           throw new Error(data.error ?? "Failed to save your lead.");
//         }

//         setActiveLead({
//           leadId: data.leadId,
//           email
//         });

//         router.push(`/plans?leadId=${data.leadId}`);
//       } catch (submissionError) {
//         setError(
//           submissionError instanceof Error
//             ? submissionError.message
//             : "We couldn't save your details. Please try again."
//         );
//       } finally {
//         setSubmitting(false);
//       }
//     }

//     const q = QUESTIONS[step];

//     if (showEmailCapture) {
//       return (
//         <main style={emailCaptureStyles.page}>
//           <div style={emailCaptureStyles.card}>
//             <div style={emailCaptureStyles.header}>
//               <div style={emailCaptureStyles.logoRow}>
//                 <span style={emailCaptureStyles.logoText}>
//                   face<span style={emailCaptureStyles.logoAccent}>yoga</span>
//                   <sup style={emailCaptureStyles.logoReg}>®</sup>
//                 </span>
//                 <div style={emailCaptureStyles.ratingRow}>
//                   <span style={emailCaptureStyles.excellentText}>Excellent</span>
//                   <StarRating />
//                 </div>
//               </div>
//             </div>

//             <div style={emailCaptureStyles.divider} />

//             <div style={emailCaptureStyles.heroSection}>
//               <div style={emailCaptureStyles.badge}>✅ Analysis Complete</div>
//               <h2 style={emailCaptureStyles.heading}>
//                 Your Personal Plan
//                 <br />
//                 <span style={emailCaptureStyles.headingAccent}>Is Ready</span>
//               </h2>
//               <p style={emailCaptureStyles.subheading}>
//                 You Could Look{" "}
//                 <strong style={emailCaptureStyles.strong}>Years Younger</strong>{" "}
//                 If You Start Today
//               </p>
//             </div>

//             <div style={emailCaptureStyles.formWrapper}>
//               <form onSubmit={handleLeadSubmit} noValidate style={emailCaptureStyles.form}>
//                 <div style={emailCaptureStyles.inputRow}>
//                   <div style={emailCaptureStyles.inputWrapper}>
//                     <label htmlFor="promo-email" style={emailCaptureStyles.label}>
//                       Email Address
//                     </label>
//                     <input
//                       id="promo-email"
//                       type="email"
//                       required
//                       name="email"
//                       value={email}
//                       onChange={(e) => {
//                         setEmail(e.target.value);
//                         if (error) setError(null);
//                       }}
//                       placeholder="you@example.com"
//                       style={{
//                         ...emailCaptureStyles.input,
//                         ...(error ? emailCaptureStyles.inputError : {})
//                       }}
//                       aria-describedby={error ? "email-error" : undefined}
//                       aria-invalid={!!error}
//                       autoComplete="email"
//                     />
//                     {error ? (
//                       <p id="email-error" style={emailCaptureStyles.errorText} role="alert">
//                         {error}
//                       </p>
//                     ) : null}
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     style={{
//                       ...emailCaptureStyles.button,
//                       ...(submitting ? emailCaptureStyles.buttonDisabled : {})
//                     }}
//                   >
//                     {submitting ? "Saving..." : "Get my plan \uD83D\uDC49"}
//                   </button>
//                 </div>
//               </form>
//             </div>

//             <div style={emailCaptureStyles.trustBar}>
//               <div style={emailCaptureStyles.trustLeft}>
//                 <span style={emailCaptureStyles.lockColor}>
//                   <LockIcon />
//                 </span>
//                 <span style={emailCaptureStyles.trustText}>
//                   Your information is secure with us
//                 </span>
//               </div>
//               <div style={emailCaptureStyles.trustLogos}>
//                 <span style={emailCaptureStyles.trustBadge}>🛡️ Norton</span>
//                 <span style={emailCaptureStyles.trustBadge}>🔒 McAfee</span>
//               </div>
//             </div>

//             <p style={emailCaptureStyles.legal}>
//               By clicking you agree to our{" "}
//               <a href="/privacy" target="_blank" rel="noreferrer" style={emailCaptureStyles.legalLink}>
//                 Privacy Policy
//               </a>
//               . We respect your privacy. We will never sell, rent, or share your
//               email address. That is more than a policy; it is our personal
//               guarantee!
//             </p>
//           </div>
//         </main>
//       );
//     }

//     return (
//       <main className="min-h-screen flex flex-col items-center justify-center px-2 py-4" style={{ backgroundColor: "#fceef0" }}>
//         {/* Header with Logo and Rating */}
//       <TopBar/>

//         {/* Main Quiz Card - Wider */}
//         <div className="w-full max-w-4xl mb-8">
//           <div className="bg-white rounded-[32px] shadow-glow p-6 sm:p-10 lg:p-12 flex flex-col gap-6 border border-white/80">
//             {/* Progress Bar Inside Card at Top */}
//             <div className="w-full">
//               <div className="h-1.5 rounded-full bg-mist overflow-hidden shadow-sm">
//                 <div
//                   className="h-full bg-gradient-to-r from-forest to-ember transition-all duration-500"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//               <div className="mt-2 text-center text-sm text-forest/60">
//                 <span className="font-semibold">{progress}%</span>
//               </div>
//             </div>

//             {q.type === "info" ? (
//               <InfoStep q={q} onContinue={() => advance(true)} />
//             ) : q.type === "gender" ? (
//               <GenderStep onSelect={advance} subAnswer={subAnswer} setSubAnswer={setSubAnswer} />
//             ) : q.type === "multi" ? (
//               <MultiStep key={step} q={q} onNext={advance} />
//             ) : q.type === "text" ? (
//               <TextStep key={step} q={q} onSelect={advance} />
//             ) : q.type === "number" ? (
//               <NumberStep key={step} q={q} onSelect={advance} />
//             ) : (
//               <SingleStep key={step} q={q} onSelect={advance} />
//             )}
//           </div>
//           {/* As Seen On and Security Badges (removed stray alt links below) */}
//         </div>

//         {/* Back button */}
//         {step > 0 && !showEmailCapture && (
//           <button
//             onClick={() => setStep(s => s - 1)}
//             className="text-forest/70 hover:text-forest font-medium text-lg mt-2"
//           >
//             {''} Back
//           </button>
//         )}
//       </main>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  QUIZ_ANSWERS_STORAGE_KEY,
  readAttribution,
  readQuizAnalysis,
  setQuizAnalysis,
  setActiveLead
} from "@/lib/meta/attribution";
import {
  createEventId,
  trackBrowserMetaEvent,
  trackServerMetaEvent
} from "@/lib/meta/browser";
import { buildQuizAnalysis, type QuizAnalysis } from "@/lib/quiz/analysis";
import TopBar from "./top-bar";

const StarRating = () => (
  <svg
    width="100"
    height="19"
    viewBox="0 0 6248 1172"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="4.5 out of 5 stars"
  >
    {[0, 1269, 2538, 3807].map((x, i) => (
      <g key={i}>
        <rect x={x} width={1171} height={1172} fill="#f57f96" />
        <polygon
          points={`${x + 585},229 ${x + 681},492 ${x + 961},501 ${x + 740},673 ${x + 817},942 ${x + 585},785 ${x + 353},942 ${x + 431},673 ${x + 210},501 ${x + 490},492`}
          fill="white"
        />
      </g>
    ))}
    <rect x={5076} width={1172} height={1172} fill="#ffd9df" />
    <rect x={5076} width={586} height={1172} fill="#f57f96" />
    <polygon
      points="5662,229 5757,492 6037,501 5816,673 5894,942 5662,785 5430,942 5508,673 5286,501 5566,492"
      fill="white"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2m-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1z" />
  </svg>
);

const emailCaptureStyles: Record<string, React.CSSProperties> = {
  logoImage: {
    height: "40px",
    width: "200px",
    objectFit: "contain" // keeps aspect ratio, prevents distortion
  },
  page: {
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(45, 27, 53, 0.4)",
    backdropFilter: "blur(10px)",
    padding: "24px 16px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    zIndex: 60
  },
  card: {
    background: "#ffffff",
    borderRadius: "28px",
    border: "1px solid #f8b4d4",
    boxShadow:
      "0 4px 6px -1px rgba(0,0,0,0.07), 0 20px 60px -10px rgba(245,127,150,0.22)",
    maxWidth: "540px",
    width: "100%",
    padding: "36px 32px 28px",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    position: "relative"
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    border: "1px solid #f8b4d4",
    background: "#fff5fa",
    color: "#cc4b68",
    fontSize: "18px",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  header: { marginBottom: "20px" },
  logoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px"
  },
  logoText: {
    fontSize: "28px",
    fontWeight: 800,
    letterSpacing: "-0.5px",
    color: "#111827",
    fontFamily: "'Georgia', serif"
  },
  logoAccent: { color: "#f57f96" },
  logoReg: { fontSize: "12px", color: "#6b7280", verticalAlign: "super" },
  ratingRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px"
  },
  excellentText: {
    fontSize: "12px",
    fontWeight: 700,
    color: "#111827",
    fontFamily: "sans-serif",
    letterSpacing: "0.5px",
    textTransform: "uppercase"
  },
  divider: {
    height: "1px",
    background: "linear-gradient(to right, transparent, #e5e7eb, transparent)",
    margin: "0 0 24px"
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "28px"
  },
  badge: {
    display: "inline-block",
    background: "#ffe7eb",
    color: "#cc4b68",
    fontSize: "13px",
    fontWeight: 600,
    padding: "5px 14px",
    borderRadius: "999px",
    border: "1px solid #ffc3cc",
    marginBottom: "14px",
    fontFamily: "sans-serif",
    letterSpacing: "0.3px"
  },
  heading: {
    fontSize: "clamp(26px, 5vw, 34px)",
    fontWeight: 800,
    color: "#111827",
    lineHeight: 1.2,
    margin: "0 0 10px",
    letterSpacing: "-0.5px"
  },
  headingAccent: { color: "#e85d7f" },
  subheading: {
    fontSize: "16px",
    color: "#4b5563",
    margin: 0,
    fontFamily: "sans-serif",
    lineHeight: 1.5
  },
  strong: { color: "#111827" },
  formWrapper: { marginBottom: "16px" },
  form: { width: "100%" },
  inputRow: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-end",
    flexWrap: "wrap"
  },
  inputWrapper: {
    flex: "1 1 200px",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    fontFamily: "sans-serif"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1.5px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#111827",
    fontFamily: "sans-serif",
    outline: "none",
    boxSizing: "border-box"
  },
  inputError: { borderColor: "#ef4444" },
  errorText: {
    fontSize: "12px",
    color: "#ef4444",
    margin: "2px 0 0",
    fontFamily: "sans-serif"
  },
  button: {
    flex: "0 0 auto",
    padding: "12px 20px",
    background: "linear-gradient(135deg, #ff8fa3 0%, #e85d7f 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "sans-serif",
    boxShadow: "0 4px 14px rgba(232,93,127,0.35)"
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed"
  },
  trustBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    padding: "12px 0",
    borderTop: "1px solid #f3f4f6",
    borderBottom: "1px solid #f3f4f6",
    marginBottom: "16px"
  },
  trustLeft: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },
  lockColor: { color: "#e85d7f", display: "flex", alignItems: "center" },
  trustText: {
    fontSize: "12px",
    color: "#6b7280",
    fontFamily: "sans-serif"
  },
  trustLogos: {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  },
  trustBadge: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#374151",
    fontFamily: "sans-serif",
    letterSpacing: "0.5px",
    textTransform: "uppercase"
  },
  legal: {
    fontSize: "11.5px",
    color: "#9ca3af",
    lineHeight: 1.6,
    margin: 0,
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  legalLink: {
    color: "#374151",
    fontWeight: 700,
    textDecoration: "underline"
  }
};

// const QUESTIONS = [
//   {
//     id: 0,
//     question: "Would you like to eliminate wrinkles, hooded eyelids, neck lines & look 10 years younger?",
//     type: "gender",
//     options: [
//       { label: "👨 Male",   value: "male",   img: "https://cdn.hoola.com/faceyoga-cms/1765369700175_1760430171864_thumbnail_man_c6dc188129.webp" },
//       { label: "👩 Female", value: "female", img: "https://cdn.hoola.com/faceyoga-cms/1765369692185_1760430181414_thumbnail_woman_288a247836.webp" },
//     ],
//   // Removed subquestion
//   },
//   {
//     id: 1,
//     question: "What is your age?",
//     type: "single",
//     options: [
//       { emoji: "🌱", label: "18-24" },
//       { emoji: "✨", label: "25-34" },
//       { emoji: "🌸", label: "35-44" },
//       { emoji: "🌺", label: "45-54" },
//       { emoji: "🌻", label: "55-64" },
//       { emoji: "🍀", label: "65+" },
//     ],
//   },
//   {
//     id: 2,
//     question: "Which areas concern you the most?",
//     type: "multi",
//     options: [
//       { emoji: "👁️",  label: "Hooded / droopy eyelids" },
//       { emoji: "😮",  label: "Sagging cheeks & jowls" },
//       { emoji: "💋",  label: "Lip lines & thinning lips" },
//       { emoji: "😤",  label: "Double chin & neck lines" },
//       { emoji: "😑",  label: "Forehead wrinkles" },
//       { emoji: "🙁",  label: "Nasolabial folds (smile lines)" },
//     ],
//   },
//   {
//     id: 3,
//     question: "How would you describe your current skin condition?",
//     type: "single",
//     options: [
//       { emoji: "🌟", label: "Firm and elastic" },
//       { emoji: "💧", label: "Slightly loose" },
//       { emoji: "😕", label: "Noticeably sagging" },
//       { emoji: "😟", label: "Very loose and wrinkled" },
//     ],
//   },
//   {
//     id: 4,
//     question: "Have you tried any face exercises or routines before?",
//     type: "single",
//     options: [
//       { emoji: "✅", label: "Yes, regularly" },
//       { emoji: "🔄", label: "A few times" },
//       { emoji: "❌", label: "Never" },
//     ],
//   },
//   {
//     id: 5,
//     question: "How much time can you dedicate daily to face yoga?",
//     type: "single",
//     options: [
//       { emoji: "⏱️", label: "5 minutes" },
//       { emoji: "🕐", label: "10 minutes" },
//       { emoji: "🕕", label: "15-20 minutes" },
//       { emoji: "🏆", label: "30+ minutes" },
//     ],
//   },
//   {
//     id: 6,
//     question: "What is your primary goal with Face Yoga?",
//     type: "single",
//     options: [
//       { emoji: "⏪", label: "Look younger" },
//       { emoji: "💪", label: "Tone & firm facial muscles" },
//       { emoji: "😌", label: "Reduce stress & relax" },
//       { emoji: "✨", label: "Improve skin glow" },
//       { emoji: "🎯", label: "All of the above" },
//     ],
//   },
//   {
//     id: 7,
//     question: "How did you hear about Face Yoga?",
//     type: "single",
//     options: [
//       { emoji: "📱", label: "Social media" },
//       { emoji: "👭", label: "Friend or family" },
//       { emoji: "📰", label: "Article or blog" },
//       { emoji: "📺", label: "TV or podcast" },
//       { emoji: "🔍", label: "Online search" },
//     ],
//   },
//   {
//     id: 8,
//     question: "Have you heard about Face Yoga before?",
//     type: "single",
//     options: [
//       { emoji: "🧘‍♂️", label: "Yes" },
//       { emoji: "🤏", label: "I have heard a little bit" },
//       { emoji: "🤔", label: "No" },
//     ],
//   },
//   {
//     id: 9,
//     question: "Choose your skin type",
//     type: "multi",
//     options: [
//       { emoji: "🧘‍♀️", label: "Normal" },
//       { emoji: "🌵", label: "Dry" },
//       { emoji: "⚡️", label: "Sensitive" },
//       { emoji: "🥑", label: "Oily" },
//       { emoji: "🤏", label: "Combination" },
//       { emoji: "🤷‍♂️", label: "Not sure" },
//     ],
//   },
//   {
//     id: 10,
//     question: "Do you have any of the following skin concerns?",
//     type: "multi",
//     subLabel: "Select all that apply",
//     options: [
//       { emoji: "🫣", label: "Acne" },
//       { emoji: "🌵", label: "Dryness" },
//       { emoji: "👤", label: "Neck lines" },
//       { emoji: "🥹", label: "Hooded eyelids" },
//       { emoji: "🗿", label: "Wrinkles" },
//       { emoji: "🥑", label: "Oiliness" },
//       { emoji: "⚫️", label: "Dark spots" },
//       { emoji: "✅", label: "None of the above" },
//     ],
//   },
//   {
//     id: 11,
//     question: "How would you describe your skin's sensitivity level?",
//     type: "single",
//     options: [
//       { emoji: "⚡️", label: "Very sensitive" },
//       { emoji: "🤏", label: "Moderately sensitive" },
//       { emoji: "🔅", label: "Not sensitive" },
//       { emoji: "🤷‍♂️", label: "Not sure" },
//     ],
//   },
//   {
//     id: 12,
//     question: "Have you noticed any loss of elasticity or firmness in your skin?",
//     type: "single",
//     options: [
//       { emoji: "👍", label: "Yes" },
//       { emoji: "👎", label: "No" },
//       { emoji: "🤷‍♂️", label: "Not sure" },
//     ],
//   },
//   {
//     id: 13,
//     question: "Worried about results? Over 45,132 people improved their skin condition with Face Yoga",
//     type: "info",
//     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
//     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
//     caption: "See how your face can change in just a few weeks!",
//   },
//   {
//     id: 14,
//     question: "How many hours do you sleep on average per night?",
//     type: "single",
//     options: [
//       { emoji: "😴️", label: "Less than 6 hours" },
//       { emoji: "💤", label: "6-8 hours" },
//       { emoji: "🛌", label: "More than 8 hours" },
//     ],
//   },
//   {
//     id: 15,
//     question: "How would you rate your daily stress level?",
//     type: "single",
//     options: [
//       { emoji: "🌿", label: "Low" },
//       { emoji: "⚖️", label: "Moderate" },
//       { emoji: "💥", label: "High" },
//     ],
//   },
//   {
//     id: 16,
//     question: "What is your daily water intake?",
//     type: "single",
//     options: [
//       { emoji: "💧", label: "1-2 glasses a day" },
//       { emoji: "🥤", label: "2-6 glasses a day" },
//       { emoji: "🌊", label: "More than 6 glasses" },
//     ],
//   },
//   {
//     id: 17,
//     question: "Do you smoke?",
//     type: "single",
//     options: [
//       { emoji: "🚬", label: "Yes" },
//       { emoji: "🚭", label: "No" },
//     ],
//   },
//   {
//     id: 18,
//     question: "How often do you consume alcohol?",
//     type: "single",
//     options: [
//       { emoji: "🍷", label: "Almost daily" },
//       { emoji: "🍸", label: "A few times a week" },
//       { emoji: "🥂", label: "A few times a month" },
//       { emoji: "🙅", label: "Almost never" },
//     ],
//   },
//   {
//     id: 19,
//     question: "How often do you exercise?",
//     type: "single",
//     options: [
//       { emoji: "🚴‍♂️", label: "Daily" },
//       { emoji: "🤸‍♂️", label: "A few times a week" },
//       { emoji: "🗓", label: "Rarely" },
//       { emoji: "🙅", label: "Almost never" },
//     ],
//   },
//   {
//     id: 20,
//     question: "Do you use sunscreen regularly?",
//     type: "single",
//     options: [
//       { emoji: "👍", label: "Yes" },
//       { emoji: "👎", label: "No" },
//     ],
//   },
//   {
//     id: 21,
//     question: "How often do you cleanse and moisturize your face?",
//     type: "single",
//     options: [
//       { emoji: "👌", label: "More than once a day" },
//       { emoji: "🤞", label: "Once a day" },
//       { emoji: "✌️", label: "A few times a week" },
//       { emoji: "🙅", label: "Never" },
//     ],
//   },
//   {
//     id: 22,
//     question: "How often do you visit a cosmetologist?",
//     type: "single",
//     options: [
//       { emoji: "👌", label: "Once per month or more" },
//       { emoji: "✌️", label: "Once in several months" },
//       { emoji: "🤞", label: "Once a year" },
//       { emoji: "🙅", label: "Never" },
//     ],
//   },
//   {
//     id: 23,
//     question: "How would you describe your diet?",
//     type: "single",
//     options: [
//       { emoji: "⚖️", label: "Balanced" },
//       { emoji: "🥦", label: "Vegetarian/Vegan" },
//       { emoji: "🥫", label: "Inconsistent" },
//       { emoji: "🍔", label: "High in processed foods" },
//       { emoji: "🥩", label: "High-protein" },
//       { emoji: "🍲", label: "Other" },
//     ],
//   },
//   {
//     id: 24,
//     question: "Do you experience any recurring facial discomforts such as jaw clenching, teeth grinding, or frequent headaches?",
//     type: "single",
//     options: [
//       { emoji: "👍", label: "Yes" },
//       { emoji: "👎", label: "No" },
//       { emoji: "🤷‍♂️", label: "Not sure" },
//     ],
//   },
//   {
//     id: 25,
//     question: "How many hours per day do you spend in front of screens (computer, phone, tablet, etc.)?",
//     type: "single",
//     options: [
//       { emoji: "🤏", label: "Less than 2 hours" },
//       { emoji: "🕑", label: "2-5 hours" },
//       { emoji: "🕓", label: "5-8 hours" },
//       { emoji: "⏳", label: "More than 8 hours" },
//     ],
//   },
//   {
//     id: 26,
//     question: "How often do you experience facial tension or discomfort?",
//     type: "single",
//     options: [
//       { emoji: "😩", label: "Often" },
//       { emoji: "😬", label: "Sometimes" },
//       { emoji: "🙄", label: "Rarely" },
//       { emoji: "🙅", label: "Never" },
//     ],
//   },
//   {
//     id: 27,
//     question: "What is your name?",
//     type: "text",
//     placeholder: "First Name",
//   },
//   {
//     id: 28,
//     question: "What is your age?",
//     type: "number",
//     placeholder: "Age",
//   },
//   {
//     id: 29,
//     question: "You have great potential to crush your goals!",
//     type: "info",
//     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
//     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
//     caption: "See how your face can change in just a few weeks!",
//   },
//   {
//     id: 30,
//     question: "How much time are you willing to dedicate to Face Yoga daily?",
//     type: "single",
//     options: [
//       { emoji: "🤏", label: "Less than 5 minutes" },
//       { emoji: "✌️", label: "5-10 minutes" },
//       { emoji: "🙌", label: "More than 10 minutes" },
//     ],
//   },
//   {
//     id: 31,
//     question: "What are your main goals for practicing face yoga?",
//     type: "multi",
//     subLabel: "Select all that apply",
//     options: [
//       { emoji: "👸", label: "Improve skin appearance" },
//       { emoji: "🧏‍♀️", label: "Fix hooded eyelids" },
//       { emoji: "👧", label: "Look younger" },
//       { emoji: "👩", label: "Reduce wrinkles" },
//       { emoji: "👱‍♀️", label: "Eliminate double-chin" },
//       { emoji: "☝️", label: "All of the above" },
//     ],
//   },
//   {
//     id: 32,
//     question: "Once you reach perfect skin with Face Yoga, how would you see yourself?",
//     type: "single",
//     options: [
//       { emoji: "👍", label: "Being proud of myself" },
//       { emoji: "🥰", label: "Feeling sexier" },
//       { emoji: "👑", label: "More confident" },
//       { emoji: "☝️", label: "All of the above" },
//     ],
//   },
//   {
//     id: 33,
//     question: "After reaching your goal, how would you reward yourself?",
//     type: "single",
//     options: [
//       { emoji: "👗", label: "Buying new clothes" },
//       { emoji: "✈️", label: "Travelling somewhere new" },
//       { emoji: "😎", label: "Taking a personal day" },
//       { emoji: "📸", label: "Taking more pictures" },
//       { emoji: "🥂", label: "Fun hang-out with friends" },
//       { emoji: "🎁", label: "Other" },
//     ],
//   },
//   {
//     id: 34,
//     question: "We predict you will enjoy skin that looks younger and has less facial fat in two weeks!",
//     type: "info",
//     beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
//     afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283738603_female-after.b483bbc117cb9f38e0ec.webp",
//     caption: "See how your face can change in just a few weeks!",
//   },
// ];

const QUESTIONS = [
  {
    id: 0,
    question: "Would you like to eliminate wrinkles, hooded eyelids, neck lines & look 10 years younger?",
    type: "gender",
    options: [
      { label: "👨 Male", value: "male", img: "https://cdn.hoola.com/faceyoga-cms/1765369700175_1760430171864_thumbnail_man_c6dc188129.webp" },
      { label: "👩 Female", value: "female", img: "https://cdn.hoola.com/faceyoga-cms/1765369692185_1760430181414_thumbnail_woman_288a247836.webp" },
    ],
  },
  {
    id: 2,
    question: "Have you heard about Face Yoga before?",
    type: "single",
    options: [
      { emoji: "🧘‍♂️", label: "Yes" },
      { emoji: "🤏", label: "I have heard a little bit" },
      { emoji: "🤔", label: "No" },
    ],
  },
  {
    id: 3,
    question: "Choose your skin type",
    type: "multi",
    options: [
      { emoji: "🧘‍♀️", label: "Normal" },
      { emoji: "🌵", label: "Dry" },
      { emoji: "⚡️", label: "Sensitive" },
      { emoji: "🥑", label: "Oily" },
      { emoji: "🤏", label: "Combination" },
      { emoji: "🤷‍♂️", label: "Not sure" },
    ],
  },
  {
    id: 4,
    question: "Do you have any of the following skin concerns?",
    type: "multi",
    subLabel: "Select all that apply",
    options: [
      { emoji: "🫣", label: "Acne" },
      { emoji: "🌵", label: "Dryness" },
      { emoji: "👤", label: "Neck lines" },
      { emoji: "🥹", label: "Hooded eyelids" },
      { emoji: "🗿", label: "Wrinkles" },
      { emoji: "🥑", label: "Oiliness" },
      { emoji: "⚫️", label: "Dark spots" },
      { emoji: "✅", label: "None of the above" },
    ],
  },
  {
    id: 5,
    question: "How would you describe your skin's sensitivity level?",
    type: "single",
    options: [
      { emoji: "⚡️", label: "Very sensitive" },
      { emoji: "🤏", label: "Moderately sensitive" },
      { emoji: "🔅", label: "Not sensitive" },
      { emoji: "🤷‍♂️", label: "Not sure" },
    ],
  },
  {
    id: 6,
    question: "Worried about results? Over 45,132 people improved their skin condition with Face Yoga",
    type: "info",
    beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
    afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
    caption: "See how your face can change in just a few weeks!",
  },
  {
    id: 7,
    question: "How many hours do you sleep on average per night?",
    type: "single",
    options: [
      { emoji: "😴️", label: "Less than 6 hours" },
      { emoji: "💤", label: "6-8 hours" },
      { emoji: "🛌", label: "More than 8 hours" },
    ],
  },
  {
    id: 8,
    question: "What is your daily water intake?",
    type: "single",
    options: [
      { emoji: "💧", label: "1-2 glasses a day" },
      { emoji: "🥤", label: "2-6 glasses a day" },
      { emoji: "🌊", label: "More than 6 glasses" },
    ],
  },
  {
    id: 9,
    question: "How often do you exercise?",
    type: "single",
    options: [
      { emoji: "🚴‍♂️", label: "Daily" },
      { emoji: "🤸‍♂️", label: "A few times a week" },
      { emoji: "🗓", label: "Rarely" },
      { emoji: "🙅", label: "Almost never" },
    ],
  },
  {
    id: 10,
    question: "How often do you cleanse and moisturize your face?",
    type: "single",
    options: [
      { emoji: "👌", label: "More than once a day" },
      { emoji: "🤞", label: "Once a day" },
      { emoji: "✌️", label: "A few times a week" },
      { emoji: "🙅", label: "Never" },
    ],
  },
  {
    id: 11,
    question: "How would you describe your diet?",
    type: "single",
    options: [
      { emoji: "⚖️", label: "Balanced" },
      { emoji: "🥦", label: "Vegetarian/Vegan" },
      { emoji: "🥫", label: "Inconsistent" },
      { emoji: "🍔", label: "High in processed foods" },
      { emoji: "🥩", label: "High-protein" },
      { emoji: "🍲", label: "Other" },
    ],
  },
  {
    id: 12,
    question: "How many hours per day do you spend in front of screens (computer, phone, tablet, etc.)?",
    type: "single",
    options: [
      { emoji: "🤏", label: "Less than 2 hours" },
      { emoji: "🕑", label: "2-5 hours" },
      { emoji: "🕓", label: "5-8 hours" },
      { emoji: "⏳", label: "More than 8 hours" },
    ],
  },
  {
    id: 13,
    question: "What is your name?",
    type: "text",
    placeholder: "First Name",
  },
  {
    id: 20,
    question: "What is your age?",
    type: "number",
    placeholder: "Age",
  },
  {
    id: 14,
    question: "You have great potential to crush your goals!",
    type: "info",
    beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
    afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283907568_female-after.b483bbc117cb9f38e0ec.webp",
    caption: "See how your face can change in just a few weeks!",
  },
  {
    id: 15,
    question: "How much time are you willing to dedicate to Face Yoga daily?",
    type: "single",
    options: [
      { emoji: "🤏", label: "Less than 5 minutes" },
      { emoji: "✌️", label: "5-10 minutes" },
      { emoji: "🙌", label: "More than 10 minutes" },
    ],
  },
  {
    id: 16,
    question: "What are your main goals for practicing face yoga?",
    type: "multi",
    subLabel: "Select all that apply",
    options: [
      { emoji: "👸", label: "Improve skin appearance" },
      { emoji: "🧏‍♀️", label: "Fix hooded eyelids" },
      { emoji: "👧", label: "Look younger" },
      { emoji: "👩", label: "Reduce wrinkles" },
      { emoji: "👱‍♀️", label: "Eliminate double-chin" },
      { emoji: "☝️", label: "All of the above" },
    ],
  },
  {
    id: 17,
    question: "Once you reach perfect skin with Face Yoga, how would you see yourself?",
    type: "single",
    options: [
      { emoji: "👍", label: "Being proud of myself" },
      { emoji: "🥰", label: "Feeling sexier" },
      { emoji: "👑", label: "More confident" },
      { emoji: "☝️", label: "All of the above" },
    ],
  },
  {
    id: 18,
    question: "After reaching your goal, how would you reward yourself?",
    type: "single",
    options: [
      { emoji: "👗", label: "Buying new clothes" },
      { emoji: "✈️", label: "Travelling somewhere new" },
      { emoji: "😎", label: "Taking a personal day" },
      { emoji: "📸", label: "Taking more pictures" },
      { emoji: "🥂", label: "Fun hang-out with friends" },
      { emoji: "🎁", label: "Other" },
    ],
  },
  {
    id: 19,
    question: "We predict you will enjoy skin that looks younger and has less facial fat in two weeks!",
    type: "info",
    beforeImg: "https://cdn.hoola.com/faceyoga-cms/1765283917895_female-before.3c8710dfe15b7faadfa5.webp",
    afterImg: "https://cdn.hoola.com/faceyoga-cms/1765283738603_female-after.b483bbc117cb9f38e0ec.webp",
    caption: "See how your face can change in just a few weeks!",
  },
];

const TOTAL_STEPS = QUESTIONS.length;
const ANALYSIS_STAGES = [
  {
    title: "Reading your skin profile",
    detail: "Reviewing your skin type, sensitivity, and current concerns."
  },
  {
    title: "Mapping your facial goals",
    detail: "Prioritizing the areas where you want the biggest visible change."
  },
  {
    title: "Matching your daily routine",
    detail: "Calibrating the plan to the time and habits you can realistically sustain."
  },
  {
    title: "Building your recommendation",
    detail: "Choosing the best path for your personalized face yoga journey."
  }
];

// Sub-components
function GenderStep({ onSelect, subAnswer, setSubAnswer }: {
  onSelect: (val: any) => void;
  subAnswer: string | null;
  setSubAnswer: (val: string | null) => void;
}) {
  const q = QUESTIONS[0] as any;
  const [selected, setSelected] = useState<string | null>(null);
  const handleGender = (val: string) => {
    if (!selected) {
      setSelected(val);
      setTimeout(() => onSelect(val), 300);
    }
  };
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {q.options && q.options.map((opt: any) => (
          <button
            key={opt.value}
            className={`rounded-2xl border-2 p-3 text-center transition-all bg-white ${selected === opt.value
              ? "border-ember bg-sand/20 shadow-lg"
              : "border-mist hover:border-ember/40"
              }`}
            onClick={() => handleGender(opt.value)}
            disabled={!!selected}
          >
            <img src={opt.img} alt={opt.label} className="w-full h-40 object-cover rounded-lg mb-2" />
            <p className="font-semibold text-forest">{opt.label}</p>
            {selected === opt.value && <span className="block text-ember font-bold mt-2">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function SingleStep({ q, onSelect }: {
  q: any;
  onSelect: (val: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const handle = (val: string) => {
    setSelected(val);
    setTimeout(() => onSelect(val), 300);
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className={`grid gap-3 ${q.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {q.options.map((o: any) => (
          <button
            key={o.label}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 text-left ${selected === o.label
              ? "border-ember bg-sand/20"
              : "border-mist hover:border-ember/40 bg-white"
              }`}
            onClick={() => handle(o.label)}
          >
            <span className="text-2xl">{o.emoji}</span>
            <span className="font-medium flex-1">{o.label}</span>
            {selected === o.label && <span className="text-ember font-bold">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiStep({ q, onNext }: {
  q: any;
  onNext: (val: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (label: string) => {
    setSelected(s => s.includes(label) ? s.filter(x => x !== label) : [...s, label]);
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
        {q.subLabel && <p className="text-center text-sm text-forest/60 mt-2">{q.subLabel}</p>}
      </div>
      <div className={`grid gap-3 ${q.options.length > 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {q.options.map((o: any) => (
          <button
            key={o.label}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 text-left ${selected.includes(o.label)
              ? "border-ember bg-sand/20"
              : "border-mist hover:border-ember/40 bg-white"
              }`}
            onClick={() => toggle(o.label)}
          >
            <span className="text-2xl">{o.emoji}</span>
            <span className="font-medium flex-1">{o.label}</span>
            {selected.includes(o.label) && <span className="text-ember font-bold">✓</span>}
          </button>
        ))}
      </div>
      <button
        className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${selected.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
          }`}
        disabled={selected.length === 0}
        onClick={() => onNext(selected)}
      >
        Continue →
      </button>
    </div>
  );
}

function TextStep({ q, onSelect }: {
  q: any;
  onSelect: (val: string) => void;
}) {
  const [value, setValue] = useState("");
  const handle = () => {
    if (value.trim()) {
      setTimeout(() => onSelect(value), 300);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={q.placeholder}
          className="w-full p-4 border-2 border-mist rounded-lg text-center text-2xl font-semibold focus:outline-none focus:border-ember"
          onKeyPress={(e) => e.key === "Enter" && handle()}
        />
        <button
          className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${!value.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
            }`}
          disabled={!value.trim()}
          onClick={handle}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function NumberStep({ q, onSelect }: {
  q: any;
  onSelect: (val: string) => void;
}) {
  const [value, setValue] = useState("");
  const handle = () => {
    if (value.trim()) {
      setTimeout(() => onSelect(value), 300);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      <div className="space-y-4">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={q.placeholder}
          className="w-full p-4 border-2 border-mist rounded-lg text-center text-2xl font-semibold focus:outline-none focus:border-ember"
          onKeyPress={(e) => e.key === "Enter" && handle()}
        />
        <button
          className={`w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all ${!value.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-forest/90"
            }`}
          disabled={!value.trim()}
          onClick={handle}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function InfoStep({ q, onContinue }: {
  q: any;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* <div>
        <h2 className="text-3xl font-semibold text-forest text-center">{q.question}</h2>
      </div>
      <div className="bg-white rounded-2xl p-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
          <img src={q.beforeImg} alt="Before" className="w-32 h-40 object-cover rounded-lg" />
          <svg className="w-12 h-12 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L12 13.17l3.41 3.42 1.41-1.41L13.41 12l3.41-3.41-1.41-1.41L12 10.59 8.59 7.17 7.17 8.59 10.59 12l-3.42 3.41 1.41 1.41z" />
          </svg>
          <img src={q.afterImg} alt="After" className="w-32 h-40 object-cover rounded-lg" />
        </div>
        {q.caption && <p className="text-center font-semibold text-forest">{q.caption}</p>}
      </div> */}
      <div>
        <h2 className="text-3xl font-semibold text-forest text-center">
          {q.question}
        </h2>
      </div>

      <div className="bg-white rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-center gap-4">

          <img
            src={q.beforeImg}
            alt="Before"
            className="w-32 h-40 object-cover rounded-lg"
          />

          {/* <svg
            className="w-12 h-12 text-amber-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8.59 16.59L12 13.17l3.41 3.42 1.41-1.41L13.41 12l3.41-3.41-1.41-1.41L12 10.59 8.59 7.17 7.17 8.59 10.59 12l-3.42 3.41 1.41 1.41z" />
          </svg> */}
          <svg
            className="w-12 h-12 text-amber-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>

          <img
            src={q.afterImg}
            alt="After"
            className="w-32 h-40 object-cover rounded-lg"
          />

        </div>

        {q.caption && (
          <p className="text-center font-semibold text-forest">
            {q.caption}
          </p>
        )}
      </div>
      <button
        className="w-full p-3 rounded-lg bg-forest text-white font-semibold transition-all hover:bg-forest/90"
        onClick={onContinue}
      >
        Continue →
      </button>
    </div>
  );
}

function AnalysisScreen({
  analysis,
  activeStage
}: {
  analysis: QuizAnalysis | null;
  activeStage: number;
}) {
  const completedStages = Math.min(activeStage, ANALYSIS_STAGES.length);
  const progress = Math.round((completedStages / ANALYSIS_STAGES.length) * 100);

  return (
    <div className="w-full max-w-5xl">
      <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-[0_30px_90px_rgba(45,27,53,0.18)] backdrop-blur">
        <div className="bg-[linear-gradient(135deg,#2d1b35_0%,#5a314a_48%,#e85d7f_100%)] px-6 py-8 text-white sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
            Personalized Analysis
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
            {analysis?.firstName
              ? `Analyzing your answers, ${analysis.firstName}`
              : "Analyzing your answers"}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 sm:text-base">
            {analysis?.summary ??
              "We are turning your quiz responses into a face yoga recommendation built around your skin goals and daily rhythm."}
          </p>

          <div className="mt-6">
            <div className="h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#ffd5e5_0%,#ffffff_100%)] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm font-medium text-white/75">
              {progress}% complete
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            {ANALYSIS_STAGES.map((stage, index) => {
              const isComplete = index < completedStages;
              const isActive = index === activeStage && activeStage < ANALYSIS_STAGES.length;

              return (
                <div
                  key={stage.title}
                  className={`rounded-[24px] border px-5 py-5 transition-all ${
                    isComplete
                      ? "border-[#f3a8c9] bg-[#fff4f9]"
                      : isActive
                        ? "border-[#e85d7f] bg-[#fff8fb] shadow-[0_14px_40px_rgba(232,93,127,0.14)]"
                        : "border-[#f4d4e2] bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        isComplete
                          ? "bg-[#10b981] text-white"
                          : isActive
                            ? "bg-[#e85d7f] text-white"
                            : "bg-[#fdf0f6] text-[#c76a8b]"
                      }`}
                    >
                      {isComplete ? "✓" : index + 1}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-[#2d1b35]">
                        {stage.title}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-[#6f6076]">
                        {stage.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-[#f3a8c9] bg-[linear-gradient(180deg,#fff8fb_0%,#fff2f7_100%)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c4177a]">
                What we found
              </p>
              <ul className="mt-4 space-y-3">
                {(analysis?.insightBullets ?? []).map((item) => (
                  <li
                    key={item}
                    className="rounded-[18px] border border-[#f7c7db] bg-white px-4 py-3 text-sm leading-6 text-[#5a4a6a]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[24px] border border-[#eddde6] bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f7b93]">
                Recommendation logic
              </p>
              <p className="mt-3 text-sm leading-7 text-[#5a4a6a]">
                {analysis?.planReason ??
                  "Balancing your concerns, goals, and daily commitment to choose the best plan fit."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component
export function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [subAnswer, setSubAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [analysis, setAnalysis] = useState<QuizAnalysis | null>(null);
  const [showAnalysisScreen, setShowAnalysisScreen] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventId = createEventId();
    const attribution = readAttribution();
    const eventSourceUrl = window.location.href;

    trackBrowserMetaEvent("ViewContent", eventId, { content_name: "quiz" });
    void trackServerMetaEvent({
      eventName: "ViewContent",
      eventId,
      eventSourceUrl,
      attribution: attribution ?? undefined,
      customData: {
        source: attribution?.source
      }
    });
  }, []);

  useEffect(() => {
    const savedAnalysis = readQuizAnalysis();

    if (savedAnalysis) {
      setAnalysis(savedAnalysis);
    }
  }, []);

  useEffect(() => {
    if (!showAnalysisScreen) {
      return;
    }

    if (analysisStage >= ANALYSIS_STAGES.length) {
      const timeout = window.setTimeout(() => {
        setShowAnalysisScreen(false);
        setShowEmailCapture(true);
      }, 350);

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setAnalysisStage((currentStage) => currentStage + 1);
    }, analysisStage === 0 ? 900 : 1150);

    return () => window.clearTimeout(timeout);
  }, [analysisStage, showAnalysisScreen]);

  const progress = Math.round((step / TOTAL_STEPS) * 100);

  const advance = (val: any) => {
    const newAnswers = { ...answers, [step]: val };
    setAnswers(newAnswers);
    window.localStorage.setItem(
      QUIZ_ANSWERS_STORAGE_KEY,
      JSON.stringify(newAnswers)
    );

    if (step + 1 >= TOTAL_STEPS) {
      const nextAnalysis = buildQuizAnalysis(newAnswers);
      setAnalysis(nextAnalysis);
      setQuizAnalysis(nextAnalysis);
      setAnalysisStage(0);
      setShowAnalysisScreen(true);
    } else {
      setStep(s => s + 1);
    }
  };

  async function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const eventId = createEventId();
    const attribution = readAttribution();
    const eventSourceUrl = window.location.href;

    trackBrowserMetaEvent("Lead", eventId, {
      content_name: "quiz_email_capture"
    });

    try {
      const stringifiedAnswers: Record<string, string> = {};
      for (const [key, value] of Object.entries(answers)) {
        stringifiedAnswers[key] = Array.isArray(value) ? value.join(", ") : String(value);
      }

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          quizAnswers: stringifiedAnswers,
          eventId,
          eventSourceUrl,
          attribution
        })
      });

      let data: { error?: string; leadId?: string } = {};

      try {
        data = (await response.json()) as { error?: string; leadId?: string };
      } catch (parseError) {
        console.error("[quiz] Failed to parse lead response", parseError);
      }

      if (!response.ok || !data.leadId) {
        throw new Error(data.error ?? "Failed to save your lead.");
      }

      setActiveLead({
        leadId: data.leadId,
        email
      });

      router.push(`/plans?leadId=${data.leadId}`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We couldn't save your details. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const q = QUESTIONS[step];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-2 py-4"
      style={{
        backgroundColor: "#fceef0",
        backgroundImage: 'url("/images/quiz_background.jpeg")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      <TopBar />

      {/* Email capture overlay — renders on top of the quiz */}
      {showEmailCapture && (
        <div style={emailCaptureStyles.page}>
          <div style={emailCaptureStyles.card}>
            <button
              type="button"
              onClick={() => setShowEmailCapture(false)}
              style={emailCaptureStyles.closeButton}
              aria-label="Close email popup"
            >
              ×
            </button>

            {/* <div style={emailCaptureStyles.header}>
              <div style={emailCaptureStyles.logoRow}>
                <span style={emailCaptureStyles.logoText}>
                  face<span style={emailCaptureStyles.logoAccent}>yoga</span>
                  <sup style={emailCaptureStyles.logoReg}>®</sup>
                </span>
                <div style={emailCaptureStyles.ratingRow}>
                  <span style={emailCaptureStyles.excellentText}>Excellent</span>
                  <StarRating />
                </div>
              </div>
            </div> */}

            <div style={emailCaptureStyles.header}>
              <div style={emailCaptureStyles.logoRow}>

                <img
                  src="images/roopveda_logo.jpeg"
                  alt="Face Yoga"
                  style={emailCaptureStyles.logoImage}
                />

                <div style={emailCaptureStyles.ratingRow}>
                  <span style={emailCaptureStyles.excellentText}>Excellent</span>
                  <StarRating />
                </div>

              </div>
            </div>

            <div style={emailCaptureStyles.divider} />

            <div style={emailCaptureStyles.heroSection}>
              <div style={emailCaptureStyles.badge}>Analysis Complete</div>
              <h2 style={emailCaptureStyles.heading}>
                Your Personal Plan
                <br />
                <span style={emailCaptureStyles.headingAccent}>Is Ready</span>
              </h2>
              <p style={emailCaptureStyles.subheading}>
                {analysis?.summary ??
                  "Enter your email to unlock your personalized face yoga plan."}
              </p>
              <p style={{ ...emailCaptureStyles.subheading, marginTop: "10px" }}>
                <strong style={emailCaptureStyles.strong}>
                  {analysis?.planReason ??
                    "Your answers have been matched to the best next step."}
                </strong>
              </p>
            </div>

            <div style={emailCaptureStyles.formWrapper}>
              <form onSubmit={handleLeadSubmit} noValidate style={emailCaptureStyles.form}>
                <div style={emailCaptureStyles.inputRow}>
                  <div style={emailCaptureStyles.inputWrapper}>
                    <label htmlFor="promo-email" style={emailCaptureStyles.label}>
                      Email Address
                    </label>
                    <input
                      id="promo-email"
                      type="email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="you@example.com"
                      style={{
                        ...emailCaptureStyles.input,
                        ...(error ? emailCaptureStyles.inputError : {})
                      }}
                      aria-describedby={error ? "email-error" : undefined}
                      aria-invalid={!!error}
                      autoComplete="email"
                    />
                    {error ? (
                      <p id="email-error" style={emailCaptureStyles.errorText} role="alert">
                        {error}
                      </p>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      ...emailCaptureStyles.button,
                      ...(submitting ? emailCaptureStyles.buttonDisabled : {})
                    }}
                  >
                    {submitting ? "Saving..." : "Get my plan 👉"}
                  </button>
                </div>
              </form>
            </div>

            <div style={emailCaptureStyles.trustBar}>
              <div style={emailCaptureStyles.trustLeft}>
                <span style={emailCaptureStyles.lockColor}>
                  <LockIcon />
                </span>
                <span style={emailCaptureStyles.trustText}>
                  Your information is secure with us
                </span>
              </div>
              <div style={emailCaptureStyles.trustLogos}>
                <span style={emailCaptureStyles.trustBadge}>🛡️ Norton</span>
                <span style={emailCaptureStyles.trustBadge}>🔒 McAfee</span>
              </div>
            </div>

            <p style={emailCaptureStyles.legal}>
              By clicking you agree to our{" "}
              <a href="/privacy" target="_blank" rel="noreferrer" style={emailCaptureStyles.legalLink}>
                Privacy Policy
              </a>
              . We respect your privacy. We will never sell, rent, or share your
              email address. That is more than a policy; it is our personal
              guarantee!
            </p>
          </div>
        </div>
      )}

      {showAnalysisScreen ? (
        <AnalysisScreen analysis={analysis} activeStage={analysisStage} />
      ) : (
        <div className="w-full max-w-4xl mb-8">
          <div className="bg-white rounded-[32px] shadow-glow p-6 sm:p-10 lg:p-12 flex flex-col gap-6 border border-white/80">
            {/* Progress Bar Inside Card at Top */}
            <div className="w-full">
              <div className="h-1.5 rounded-full bg-mist overflow-hidden shadow-sm">
                <div
                  className="h-full bg-gradient-to-r from-forest to-ember transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-center text-sm text-forest/60">
                <span className="font-semibold">{progress}%</span>
              </div>
            </div>

            {q.type === "info" ? (
              <InfoStep q={q} onContinue={() => advance(true)} />
            ) : q.type === "gender" ? (
              <GenderStep onSelect={advance} subAnswer={subAnswer} setSubAnswer={setSubAnswer} />
            ) : q.type === "multi" ? (
              <MultiStep key={step} q={q} onNext={advance} />
            ) : q.type === "text" ? (
              <TextStep key={step} q={q} onSelect={advance} />
            ) : q.type === "number" ? (
              <NumberStep key={step} q={q} onSelect={advance} />
            ) : (
              <SingleStep key={step} q={q} onSelect={advance} />
            )}
          </div>
        </div>
      )}

      {/* Back button */}
      {step > 0 && !showEmailCapture && !showAnalysisScreen && (
        <button
          onClick={() => setStep(s => s - 1)}
          className="text-forest/70 hover:text-forest font-medium text-lg mt-2"
        >
          {"<"} Back
        </button>
      )}
    </main>
  );
}
