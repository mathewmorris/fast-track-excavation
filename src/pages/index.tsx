import Head from "next/head";
import Image, { type StaticImageData } from "next/image";

import excavationImage from '../../public/excavation/excavation-01.jpg';
import housePadsAndDirtWorkImage from '../../public/excavation/excavation-13.jpg';
import trenchingImage from '../../public/excavation/excavation-06.jpg';

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  bestTime: z.string(),
  preferredCommunication: z.string(),
  contactless: z.string(),
  platformPreference: z.string(),
  job: z.string(),
  when: z.string(),
});

export type Schema = z.infer<typeof schema>;

const ServiceCard = ({ image, alt, text }: { image: StaticImageData, alt: string, text: string }) => {
  return (
    <div className="rounded bg-gray-50 shadow-sm flex items-center flex-col justify-center overflow-hidden max-w-[24rem]">
      <div className="h-48 overflow-clip relative">
        <Image src={image} alt={alt} className="-top-8 relative" />
      </div>
      <h4 className="text-lg p-5">{text}</h4>
    </div>
  )
}

export const RequestQuoteButton = () => {
  return (
    <a 
      href="#request-quote"
      className="rounded-full bg-red-600 hover:bg-red-500 py-2 px-4 text-white font-bold"
    >
      Request a quote now!
    </a>
  );
}

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Schema>();
  const [requestStatus, setRequestStatus] = useState<'success'|'fail'|'pending'|'initial'>('initial');
  const contactLessInput = watch('contactless');
  const onSubmit: SubmitHandler<Schema> = data => {
    setRequestStatus('pending');
    void fetch('/api/submit-request', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        setRequestStatus('success')
      } else {
        setRequestStatus('fail');
      }
    }).catch(() => {
      setRequestStatus('fail');
    })
  }

  return (
    <>
      <Head>
        <title>Fast Track Excavation</title>
        <meta name="description" content="With over 40 years of experience, we specialize in excavation and utility work. Request a quote!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <section className="h-[32rem] w-full bg-[url('/hero.jpg')] bg-cover bg-center mb-4 relative">
          <div className="bg-gray-950/50 absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold drop-shadow-2xl text-white max-w-xl text-center p-4 mb-4">Your Excavation Contractor in Oklahoma</h1>
            <RequestQuoteButton />
          </div>
        </section>
        <section className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl text-red-500 font-bold text-center mb-10">Services We Provide</h2>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard image={housePadsAndDirtWorkImage} alt="excavation with pipes" text="House Pads and Dirt Work" />
            <ServiceCard image={excavationImage} alt="level ground" text="Excavation Services" />
            <ServiceCard image={trenchingImage} alt="ditch" text="Trenching" />
          </div>
        </section>
        <section id="request-quote" className="py-8 w-full md:w-3/4 lg:w-[42rem]">
          <div className="mb-10 text-center">
            <h2 className="text-3xl text-red-500 font-bold">Request a Quote</h2>
            <span className="text-gray-500 text-sm">* indicates requirement</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="md:grid md:grid-cols-2 md:gap-3">
              <label htmlFor="firstName" className="flex flex-col mb-1">
                <span className={`text-red-500 mb-1 ${errors.firstName ? "text-red-500 font-bold" : null}`}>First Name *</span>
                <input 
                  {...register('firstName', { required: true })} 
                  aria-invalid={errors.firstName ? true : false} 
                  className={`${errors.firstName ? "border-red-500 border-2 rounded" : null}`}
                />
              </label>
              <label htmlFor="lastName" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.lastName ? "text-red-500 font-bold" : null}`}>Last Name *</span>
                <input {...register('lastName', { required: true })} 
                  aria-invalid={errors.lastName ? true : false} 
                  className={`${errors.lastName ? "border-red-500 border-2 rounded" : null}`}
                />
              </label>
              </div>
              <label htmlFor="email" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.email ? "text-red-500 font-bold" : null}`}>Email *</span>
                <input {...register('email', { required: true })} 
                  aria-invalid={errors.email ? true : false} 
                  className={`${errors.email ? "border-red-500 border-2 rounded" : null}`}
                />
              </label>
              <label htmlFor="phone" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.phone ? "text-red-500 font-bold" : null}`}>Phone *</span>
                <input
                  type="text" 
                  {...register('phone', { required: true })}
                  aria-invalid={errors.phone ? true : false} 
                  className={`${errors.phone ? "border-red-500 border-2 rounded" : null}`}
                />
              </label>
              <label htmlFor="bestTime" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.bestTime ? "text-red-500 font-bold" : null}`}>Best time to reach you? *</span>
                <select {...register('bestTime', { required: true })}
                  aria-invalid={errors.bestTime ? true : false} 
                  className={`${errors.bestTime ? "border-red-500 border-2 rounded" : null}`}
                >
                  <option label="Select..." value="" />
                  <option label="Text Anytime" value="Text Anytime" />
                  <option label="Call Anytime" value="Call Anytime" />
                  <option label="Text to schedule" value="Text to schedule" />
                  <option label="Call to schedule" value="Call to schedule" />
                </select>
              </label>
              <label htmlFor="preferredCommunication" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.preferredCommunication ? "text-red-500 font-bold" : null}`}>Preferred method of communication *</span>
                <select {...register('preferredCommunication', { required: true })}
                  aria-invalid={errors.preferredCommunication ? true : false} 
                  className={`${errors.preferredCommunication ? "border-red-500 border-2 rounded" : null}`}
                >
                  <option label="Select..." value="" />
                  <option label="Phone" value="Phone" />
                  <option label="Email" value="Email" />
                  <option label="Other (see contactless details)" value="Other" />
                </select>
              </label>
              <label htmlFor="contactless" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.contactless ? "text-red-500 font-bold" : null}`}>Contactless? *</span>
                <select {...register('contactless', { required: true })}
                  aria-invalid={errors.contactless ? true : false} 
                  className={`${errors.contactless ? "border-red-500 border-2 rounded" : null}`}
                >
                  <option label="Select..." value="" />
                  <option label="In person is okay" value="In Person" />
                  <option label="Let's communicate with minimal contact" value="Contactless" />
                </select>
              </label>
              <label htmlFor="platformPreference" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.platformPreference ? "text-red-500 font-bold" : null}`}>Contactless: what platform do you prefer? {contactLessInput === 'Contactless' ? '*' : ''}</span>
                <textarea {...register('platformPreference', { required: contactLessInput === 'Contactless' })} 
                  aria-invalid={errors.platformPreference ? true : false} 
                  className={`${errors.platformPreference ? "border-red-500 border-2 rounded" : null} min-h-32`}
                />
              </label>
              <label htmlFor="job" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.job ? "text-red-500 font-bold" : null}`}>What are you looking to do? *</span>
                <span className="text-gray-500 text-sm">Please tell us as much about your project as you can</span>
                <textarea {...register('job', { required: true })} 
                  aria-invalid={errors.job ? true : false} 
                  className={`${errors.job ? "border-red-500 border-2 rounded" : null} min-h-32`}
                />
              </label>
              <label htmlFor="when" className="flex flex-col">
                <span className={`text-red-500 mb-1 ${errors.when ? "text-red-500 font-bold" : null}`}>When would you like this done? *</span>
                <select {...register('when', { required: true })}
                  aria-invalid={errors.when ? true : false} 
                  className={`${errors.when ? "border-red-500 border-2 rounded" : null}`}
                >
                  <option label="Select..." value="" />
                  <option label="We are leaking/not flowing - ASAP!" value="ASAP" />
                  <option label="Depending on price - we are ready anytime." value="Depend on Price Anytime" />
                  <option label="This year" value="This year" />
                  <option label="Not sure - would like to discuss" value="Not sure - discuss" />
                </select>
              </label>
            </div>
            <input type="submit" className="rounded-full bg-red-600 hover:bg-red-500 py-4 px-8 text-white font-bold w-full md:w-auto mt-10 mb-6" />
            {requestStatus === 'pending' && <p className="text-gray-700">Working on that for you...</p>}
            {requestStatus === 'success' && <p className="text-green-700">We got your request! We'll be in touch!</p>}
            {requestStatus === 'fail' && <p className="text-lg text-white rounded bg-red-700 p-2">Looks like something went wrong on our end. We're looking into it, in the meantime, <a href="mailto:fasttrackexcavation@gmail.com" className="font-bold hover:text-red-500">click here to shoot us an email</a>.</p>}
          </form>
        </section>
      </main>
    </>
  );
}
