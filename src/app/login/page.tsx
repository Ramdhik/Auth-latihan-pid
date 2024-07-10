'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/ui/navbar';
import { login } from '@/lib';
import { useRouter } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export default function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const router = useRouter();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);

    const response = await login(formData);

    if (response.success) {
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/cekOngkir'); // Redirect to a protected route
      }, 2000);
    } //else {
    //   setToast({ title: 'Error', description: response.message });
    // }
  }

  return (
    <>
      {' '}
      <Navbar />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 m-auto mt-20">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                {/* <FormDescription>This is your public display name.</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
