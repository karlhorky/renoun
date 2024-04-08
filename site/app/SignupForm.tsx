'use client'
import { useEffect, useRef, useState } from 'react'

import styles from './SignupForm.module.css'

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle'
  )
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clearTimeoutId = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('loading')
    clearTimeoutId()

    try {
      let response = await fetch(
        'https://souporserious.lemonsqueezy.com/email-subscribe/external',
        { method: 'POST', body: new FormData(event.currentTarget) }
      )

      if (response.ok) {
        setMessage(`You have been subscribed successfully!`)
      } else {
        setMessage(`Sorry, your subscription could not be processed.`)
      }
      setState('success')
      timeoutId.current = setTimeout(() => {
        setMessage(null)
        setState('idle')
      }, 5000)
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Sorry, there was an issue: ${error.message}`)
      }
      setState('error')
    }
  }

  useEffect(() => {
    return () => {
      clearTimeoutId()
    }
  }, [])

  return (
    <form data-state={state} className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="email"
          name="email"
          id="email"
          aria-label="Email address"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={styles.input}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className={styles.button}
        >
          <span>Subscribe</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            className={styles.arrowIcon}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.59388 3.22373L9.0596 2.68945L7.99104 3.75801L8.52532 4.2923L12.5245 8.29154H1.75559H1V9.80271H1.75559H12.5245L8.52532 13.802L7.99104 14.3362L9.0596 15.4048L9.59388 14.8705L14.7049 9.75949C15.0984 9.36606 15.0984 8.72818 14.7049 8.33475L9.59388 3.22373Z"
              fill="#CDEDFF"
            />
          </svg>
        </button>
      </div>
      {message ? <div className={styles.message}>{message}</div> : null}
    </form>
  )
}
