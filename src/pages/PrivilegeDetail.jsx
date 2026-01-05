import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Star, Shield, Check, Share2 } from 'lucide-react';
import { privilegePackages, defaultWalletData } from '../data/mockData';
import { Button } from '../components/ui/Button';

const PrivilegeDetail = () => {
    const { id } = useParams();
    const privilege = privilegePackages.find(p => p.id === parseInt(id));

    if (!privilege) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Privilege not found</h1>
                <Link to="/" className="text-primary hover:underline">Go back home</Link>
            </div>
        );
    }

    const canAfford = defaultWalletData.totalPoints >= privilege.price;

    return (
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
            {/* Back Button */}
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Privileges</span>
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden aspect-square">
                    <img
                        src={privilege.image}
                        alt={privilege.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://placehold.co/600x600/e2e8f0/64748b?text=Image';
                        }}
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-700 shadow-sm">
                            {privilege.categoryLabel}
                        </span>
                    </div>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Share2 className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{privilege.title}</h1>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="font-medium">{privilege.rating}</span>
                            <span>({privilege.reviews} reviews)</span>
                        </div>
                        {privilege.venue && (
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                <MapPin className="w-4 h-4" />
                                {privilege.venue}
                            </span>
                        )}
                        {privilege.eventDate && (
                            <span className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                {privilege.eventDate}
                            </span>
                        )}
                    </div>

                    {/* Price Card */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                        <p className="text-sm text-gray-500 mb-2">Redeem with</p>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/images/flips_token.png" alt="Flips" className="w-10 h-10" />
                            <span className="text-4xl font-bold text-gray-900">{privilege.price.toLocaleString()}</span>
                            <span className="text-xl text-gray-500">Flips</span>
                        </div>
                        <Button
                            className="w-full"
                            disabled={!canAfford}
                        >
                            {canAfford ? 'Redeem Now' : 'Insufficient Balance'}
                        </Button>
                        {!canAfford && (
                            <p className="text-sm text-red-500 mt-2 text-center">
                                You need {(privilege.price - defaultWalletData.totalPoints).toLocaleString()} more Flips
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Description</h3>
                        <p className="text-gray-600 leading-relaxed">{privilege.description}</p>
                    </div>

                    {/* Conditions */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-3">Terms & Conditions</h3>
                        <ul className="space-y-2">
                            {privilege.conditions?.map((condition, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-600">
                                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>{condition}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                        <Shield className="w-4 h-4" />
                        <span>Secure Redemption • Instant Delivery</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivilegeDetail;
