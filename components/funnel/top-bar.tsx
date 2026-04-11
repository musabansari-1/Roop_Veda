// // components/TopBar.tsx

// export default function TopBar() {
//   return (
//     <div className="w-full px-5 py-2.5 flex items-center justify-between" style={{ backgroundColor: "#f53163" }}>
//       {/* Left: Logo */}
//       <span className="text-white font-bold text-sm tracking-wide">
//         FaceYoga
//       </span>

//       {/* Right: Boxed Star Rating */}
//       <div className="flex items-center gap-2">
//         <div className="flex gap-1">
//           {[1, 2, 3, 4, 5].map((s) => (
//             <div
//               key={s}
//               className="w-6 h-6 rounded flex items-center justify-content-center"
//               style={{ backgroundColor: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center" }}
//             >
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff">
//                 <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
//               </svg>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


export default function TopBar() {
  return (
    <div
      className="fixed top-0 left-0 w-full px-5 py-2.5 flex items-center justify-between z-50"
      style={{ backgroundColor: "#f53163" }}
    >
      {/* Left: Logo */}
      <span className="text-white font-bold text-sm tracking-wide">
        FaceYoga
      </span>

      {/* Right: Boxed Star Rating */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: "#22c55e" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#ffffff">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}