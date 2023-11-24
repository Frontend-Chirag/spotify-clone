import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/libs/stripe';
import { getUrl } from '@/libs/helpers';
import { createOrRetreveCustomer } from '@/libs/supabaseAdmin';

export async function POST() {
    try {
        const supabase = await createRouteHandlerClient({
            cookies
        });

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw Error('Could not get user');

        const customer = await createOrRetreveCustomer({
            uuid: user.id || '',
            email: user.email || ''
        });

        if (!customer) throw new Error('could not get customer');

        const { url } = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getUrl()}/account`
        });

        return NextResponse.json({ url });
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Error', {status: 500})
    }
}