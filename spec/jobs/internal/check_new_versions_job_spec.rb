require 'rails_helper'

RSpec.describe Internal::CheckNewVersionsJob, type: :job do
  subject(:job) { described_class.perform_now }

  it 'updates the latest bnk2 version in redis' do
    version = '1.1.1'
    allow(Rails.env).to receive(:production?).and_return(true)
    allow(op2Hub).to receive(:latest_version).and_return(version)
    job
    expect(op2Hub).to have_received(:latest_version)
    expect(::Redis::Alfred.get(::Redis::Alfred::LATEST_op2_VERSION)).to eq version
  end
end
