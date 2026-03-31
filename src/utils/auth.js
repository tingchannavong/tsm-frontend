
export const getHomePath = (user) => {
    if (!user) return "/tsm/login";
    if (user.role === "ADMIN") return "/tsm/admin";
    if (user.role === "STAFF") return "/tsm/staff";
    return "/tsm";
};

// Moved logic to backend
// export function filterGroups(data) {
    
//   const grouped = Object.values( 
//     data.reduce((acc, cur) => {
//     if (!acc[cur.groupId]) {
//       acc[cur.groupId] = {
//         groupId: cur.groupId,
//         items: []
//       };
//     }

//     acc[cur.groupId].items.push(cur);
//     return acc;
//   }, {}));
//   return grouped;
// }

// export function acccumulateSameStartTimes(data) {

// }
