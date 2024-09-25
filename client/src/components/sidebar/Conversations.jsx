import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = () => {
  const {loading, conversations} = useGetConversations();

  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {loading ? <span className='loading loading-spinner '></span> : conversations.map(conversation => <Conversation key={conversation._id} conversation={conversation} />)}

    </div>
  )
}

export default Conversations


// STARTER CODE FOR THIS FILE
/*
import React from 'react'
import Conversation from './Conversation'

const Conversations = () => {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
    </div>
  )
}

export default Conversations
*/