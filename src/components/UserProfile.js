import React from 'react';

function UserProfile( props ) {
    console.log(props.contacts[0].name)
  return (
    <div className="max-w-xs flex justify-center ml-16 mt-4">
      <div className="bg-white shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2">
        <img
            className="w-32 h-32 rounded-full mx-auto"
            src="https://res.cloudinary.com/steve-construction/image/upload/v1698692407/pic_t3rffb.jpg"
            alt="John Doe"
            />
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{ props.contacts[0].name }</h3>
          <div className="text-center text-gray-400 text-xs font-semibold">
            <p>{ props.contacts[0].name }</p>
          </div>
          <table className="text-xs my-3">
            <tbody>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                <td className="px-2 py-2">{ props.contacts[0].address }</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td className="px-2 py-2">{ props.contacts[0].phone }</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                <td className="px-2 py-2">{ props.contacts[0].email }</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default UserProfile;
