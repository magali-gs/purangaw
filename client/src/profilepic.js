// import React from "react";

//with descontructor
export default function ProfilePic({ first, last }) {
    console.log("props in ProfilePic: ", first, last);
    return (
        <div>
            <h1>
                ProfilePic: {first} {last}
            </h1>
        </div>
    );
}

// export default function ProfilePic(props) {
//     console.log('props in ProfilePic: ', props);
//     return (
//         <div>
//             <h1>ProfilePic: { props.first } { props.last }</h1>
//         </div>
//     );
// }