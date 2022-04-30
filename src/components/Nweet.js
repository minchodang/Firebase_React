import { dbService } from 'fBase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

export default function Nweet({ nweetObj, isOwner }) {
  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await deleteDoc(NweetTextRef);
    }
  };
  const toggleEditing = () => setEdit((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEdit(false);
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
