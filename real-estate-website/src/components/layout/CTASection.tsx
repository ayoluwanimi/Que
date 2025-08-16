import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG } from '@/lib/constants';
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-600/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-600/20 rounded-full blur-2xl"></div>
      
      <div className="relative container-width section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Ready to Find Your
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> Perfect Property</span>?
            </h2>
            <p className="text-xl md:text-2xl text-sky-100 mb-8 max-w-2xl mx-auto text-balance">
              Let our experienced agents guide you through every step of your real estate journey.
            </p>
            
            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/properties">
                <Button 
                  size="xl" 
                  className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8"
                >
                  Browse Properties
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-sky-900 px-8"
                >
                  Schedule Consultation
                  <MessageCircle className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="bg-sky-600/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Phone className="h-8 w-8 text-sky-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us Today</h3>
              <p className="text-sky-200 mb-3">Speak directly with our agents</p>
              <a 
                href={`tel:${SITE_CONFIG.company.phone}`}
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                {SITE_CONFIG.company.phone}
              </a>
            </div>
            
            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="bg-amber-600/20 p-3 rounded-full w-fit mx-auto mb-4">
                <Mail className="h-8 w-8 text-amber-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-sky-200 mb-3">Get detailed information</p>
              <a 
                href={`mailto:${SITE_CONFIG.company.email}`}
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                {SITE_CONFIG.company.email}
              </a>
            </div>
            
            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="bg-emerald-600/20 p-3 rounded-full w-fit mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-emerald-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-sky-200 mb-3">Instant assistance online</p>
              <button className="font-semibold text-amber-400 hover:text-amber-300 transition-colors">
                Start Chat
              </button>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
            <h3 className="font-serif text-2xl font-bold text-center mb-6">Why Choose Elite Realty?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-2">15+</div>
                <div className="text-sky-200">Years of Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-2">500+</div>
                <div className="text-sky-200">Properties Sold</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-2">98%</div>
                <div className="text-sky-200">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 mb-2">24/7</div>
                <div className="text-sky-200">Support Available</div>
              </div>
            </div>
          </div>
          
          {/* Final CTA */}
          <div className="text-center mt-8">
            <p className="text-sky-200 mb-4">
              Join hundreds of satisfied clients who found their dream properties with us.
            </p>
            <Link href="/about">
              <Button variant="ghost" className="text-amber-400 hover:text-amber-300 hover:bg-white/10">
                Learn More About Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}