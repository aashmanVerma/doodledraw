"use client"
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://wdzxuksnuttpafhqhhqj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkenh1a3NudXR0cGFmaHFoaHFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkyMTI1OTksImV4cCI6MTk5NDc4ODU5OX0.yAYuC2FMRoOgls4EQ3uPvBcPRgaNIgYCODL1O2Aytu8');

const submitFeedback = async (feedback) => {
    try {
        const {error} = await supabase
            .from('feedback')
            .insert(
                { title: feedback.title, type: feedback.type, description: feedback.description }
            )

        if (error) {
            throw new Error(error);
        }
    } catch (error) {
        console.log('error', error);
        return null;
    }
}

export { submitFeedback };