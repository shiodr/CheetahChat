import React, { useEffect, lazy, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
import { db } from "./lib/firebase"; // Import Firestore
import { collection, addDoc, getDocs } from "firebase/firestore";

// Dynamic imports (code-splitting)
const Chat = lazy(() => import("./components/chat/Chat"));
const Detail = lazy(() => import("./components/detail/Detail"));
const List = lazy(() => import("./components/list/List"));
const Login = lazy(() => import("./components/login/Login"));
const Notification = lazy(() => import("./components/notification/Notification"));

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  // Firestore data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "your-collection"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    if (currentUser) {
      fetchData(); // Fetch data only if a user is authenticated
    }
  }, [currentUser]);

  const handleAddData = async () => {
    try {
      const docRef = await addDoc(collection(db, "your-collection"), {
        name: "New Document",
        createdAt: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <Suspense fallback={<div>Loading...</div>}>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
          <button onClick={handleAddData}>Add Data</button> {/* Example button to add data */}
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Notification />
      </Suspense>
    </div>
  );
};

export default App;
