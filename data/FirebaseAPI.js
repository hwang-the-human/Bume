import database from '@react-native-firebase/database';
import React, {useState, useEffect} from 'react';

// export const [vendors, setVedors] = useState();

export function getVendors() {
  useEffect(() => {
    const onChildAdd = database()
      .ref('users/vendors')
      .on('child_added', (snapshot) => {
        console.log('A new node has been added', snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref('users/vendors').off('child_added', onChildAdd);
  }, []);
}
